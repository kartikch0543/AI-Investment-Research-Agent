# AlphaLens AI Architecture

This document goes one level deeper than the main README. Its purpose is to explain the runtime flow, the reasoning behind the folder structure, and the design choices that make the project easier to defend in an interview.

## System Architecture

```mermaid
flowchart TD
    User[User in React Dashboard] --> Client[React Client]
    Client -->|POST /api/research| API[Express API]
    API --> Controller[Research Controller]
    Controller --> Orchestrator[Research Orchestrator Service]
    Orchestrator --> Graph[LangGraph Research Flow]
    Graph --> Gather[Gather Information Node]
    Gather --> Fundamental[Fundamental Agent]
    Gather --> Sentiment[News Agent]
    Gather --> Risk[Risk Agent]
    Gather --> Moat[Moat Agent]
    Fundamental --> Merge[Merge Results]
    Sentiment --> Merge
    Risk --> Merge
    Moat --> Merge
    Merge --> Committee[Investment Committee Agent]
    
    subgraph LLM Provider Layer
        Committee --> LLMService[LLM Service]
        Fundamental --> LLMService
        Sentiment --> LLMService
        Risk --> LLMService
        Moat --> LLMService
        LLMService --> ProviderSelect{Provider Selection}
        ProviderSelect -->|gemini| GeminiProvider[Gemini Provider]
        ProviderSelect -->|openrouter| ORProvider[OpenRouter Provider]
        GeminiProvider -->|Fallback| ORProvider
    end
    
    Committee --> API
    API --> Client
    API --> Database[(Neon PostgreSQL)]
```

## Backend Request Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant R as Research Route
    participant O as Orchestrator
    participant G as LangGraph
    participant S as LLM Service
    participant P as Providers

    U->>C: Enter company name
    C->>R: POST /api/research
    R->>O: validate and start research
    O->>G: invoke(initialState)
    G->>S: generate(prompt)
    S->>P: select & execute primary provider
    alt Primary fails (Gemini 429/Timeout)
        S->>P: execute fallback provider (OpenRouter)
    end
    P-->>S: response JSON
    S-->>G: raw model text
    G-->>O: final state
    O-->>R: formatted response
    R-->>C: JSON result
```

## Folder Reasoning

### Backend

- `config/` exists to isolate environment, LLM configurations, and database singleton wiring from business logic.
- `providers/` isolates vendor-specific SDK concerns (e.g. LangChain Google GenAI vs OpenRouter REST request headers).
- `controllers/` exist to keep HTTP concerns thin.
- `services/` exist to hold orchestration, LLM provider routing, and deterministic business logic.
- `agents/` exist to wrap focused AI responsibilities.
- `graph/` exists so state and workflow stay explicit rather than being hidden inside controller code.
- `prompts/` exist because prompts are part of the product logic and deserve versioned ownership.
- `middleware/` exists to centralize Express behaviors such as 404 and error formatting.
- `validators/` exist to keep malformed requests from leaking into deeper layers.
- `database/` exists to prepare for persistence without mixing SQL into unrelated files.

### Frontend

- `pages/` hold route-level screens because routing concerns are different from reusable UI concerns.
- `components/` hold reusable presentation units.
- `hooks/` hold async and stateful UI logic.
- `services/` keep Axios calls out of components.
- `context/` holds cross-page state, in this case lightweight search history.
- `charts/` separates visualization code from general UI code.

## Pluggable LLM Provider Layer

Instead of tightly coupling our agents directly to the Google Gemini SDK, we've implemented a **Provider Pattern**.

### Why the Provider Pattern is Better

1. **Vendor Decoupling (Open/Closed Principle)**: The agents and orchestration graph are completely oblivious to which AI vendor or model is serving requests. If we want to switch models (e.g., from Gemini to Anthropic Claude, OpenAI, or a local LLaMA instance), we only need to add a provider under `providers/` and update `llm.config.js`. Zero agent code is touched.
2. **Resilience & Fallbacks**: If our primary LLM provider fails due to rate limits (HTTP 429), quota issues, timeouts, or network outages, the `LLMService` automatically catches the failure, logs the event, and routes the request to our secondary provider (OpenRouter) in real-time. This keeps the application 100% online.
3. **Consistent Contract (Interface Isolation)**: The LLM Service guarantees a standardized response format:
   ```javascript
   {
       success: true,
       provider: "gemini",
       model: "gemini-flash-latest",
       text: "..."
   }
   ```
   No matter how complex the downstream SDK response is, the service normalizes it, so the parsing logic inside our agents remains simple and unified.

## Why The Recommendation Is Deterministic

The key architectural choice is that the final decision is score-driven, not model-driven.

That means:

- the numeric result can be explained line by line
- prompt drift has less impact on the final action
- the system is safer to evolve
- interviewers can see a real engineering decision rather than an AI demo shortcut

## Why The Agents Are Separate

The agents are split because investment research naturally decomposes into different lenses:

- fundamentals
- news sentiment
- risk
- moat quality
- final committee synthesis

If all of this lived in one prompt, it would be harder to debug and much harder to explain.

## Current Trade-Offs

- Finance and news providers are still mock-backed so the architecture can be built before provider lock-in.
- PostgreSQL schema is defined early, and runtime persistence is fully integrated using Neon and Prisma.

## Interview Summary

A concise interview explanation:

“I separated orchestration, scoring, prompts, and UI rendering so each layer had one responsibility. The backend uses a LangGraph workflow for focused research steps, while the final recommendation is deterministic. Furthermore, I built a pluggable LLM Provider Layer using the Provider Pattern. This decouples our business logic from vendor SDKs, allowing us to route requests to Gemini or OpenRouter dynamically and handle rate-limiting or quota errors via automatic transparent fallbacks without crashing the app.”
