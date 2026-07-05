# AlphaLens AI

AlphaLens AI is a multi-agent investment research application that analyzes a company and produces a structured recommendation.

The goal of this project is not only to generate an output, but to do it with an architecture that is explainable, modular, and interview-ready.

## Why This File Exists

This README is the project's architecture contract.

It exists to:

- explain what we are building before implementation starts
- document why the system is split into multiple agents
- define folder structure early so new files have a clear home
- make future engineering decisions consistent
- help you explain the project confidently in an interview

## Project Goal

Input:

- company name

Example:

- Tesla
- Apple
- NVIDIA
- Reliance
- Microsoft

Output:

```json
{
  "decision": "BUY",
  "confidence": 82,
  "reasoning": "The company shows strong fundamentals, durable competitive advantages, and manageable risk.",
  "sources": [],
  "strengths": [],
  "weaknesses": [],
  "risks": [],
  "sentiment": {},
  "financialSummary": {},
  "overallScore": 78
}
```

## Core Design Principles

- Use multiple focused agents instead of one giant prompt.
- Keep prompts separate from routes and business logic.
- Use deterministic scoring for the final recommendation.
- Let the LLM explain the decision, not invent the scoring logic.
- Prefer readable structure over clever abstractions.
- Build incrementally so every file can be understood and defended.

## Planned Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- React Router
- Recharts

### Backend

- Node.js
- Express

### AI

- LangChain.js
- LangGraph.js
- Gemini API

### Data

- PostgreSQL when persistence becomes useful

## High-Level Architecture

The system is split into a client and a backend.

- The client is responsible for search, progress display, charts, and result visualization.
- The backend is responsible for orchestrating the research workflow, calling external APIs, running the LangGraph flow, scoring results, and returning a consistent response.

## LangGraph Workflow

The planned workflow is:

```text
START
  -> Gather Information
  -> Branch into parallel analysis
     -> Fundamental Analysis
     -> News Sentiment Analysis
     -> Risk Analysis
     -> Moat Analysis
  -> Merge Results
  -> Investment Committee
  -> END
```

### Why This Workflow

- `Gather Information` centralizes raw data collection before analysis begins.
- Parallel analysis nodes keep responsibilities small and easier to test.
- `Merge Results` combines partial outputs into one normalized structure.
- `Investment Committee` does not invent data. It explains the result using already computed evidence and scores.

### Why Not One Giant Prompt

A single prompt is simpler to start but harder to debug, harder to explain, and harder to trust.

With LangGraph:

- each node has one responsibility
- state changes are visible
- failures are easier to isolate
- prompts stay focused
- the architecture feels more like a real backend workflow than a demo

## Planned Graph State

```json
{
  "companyName": "",
  "companyProfile": {},
  "financialData": {},
  "newsArticles": [],
  "fundamentals": {},
  "sentiment": {},
  "risks": {},
  "moat": {},
  "scores": {},
  "recommendation": "",
  "confidence": 0,
  "reasoning": "",
  "sources": []
}
```

### Why Each Field Exists

- `companyName`: the anchor input used across the graph
- `companyProfile`: basic company context gathered early for downstream nodes
- `financialData`: raw numerical information used for deterministic scoring
- `newsArticles`: raw articles used by the sentiment node
- `fundamentals`: normalized output of the fundamental analysis node
- `sentiment`: structured sentiment output, not just free-text opinion
- `risks`: identified business and market risks
- `moat`: competitive advantage analysis
- `scores`: deterministic scoring breakdown by category
- `recommendation`: final action such as `BUY`, `WATCHLIST`, or `PASS`
- `confidence`: confidence in the recommendation after synthesis
- `reasoning`: human-readable explanation for the final result
- `sources`: traceable source list used to support the analysis

## Deterministic Scoring Strategy

The final recommendation should be driven by code, not by model mood.

Planned score weights:

- Financial Health: 40%
- News Sentiment: 20%
- Business Quality and Moat: 20%
- Risk: 20%

Example interpretation:

- `80-100`: BUY
- `60-79`: WATCHLIST
- `0-59`: PASS

### Why This Matters

- it makes the recommendation auditable
- it reduces LLM randomness
- it is easier to explain in an interview
- it creates a clean separation between analysis and decisioning

The LLM will explain the recommendation in natural language, but the numeric result will come from deterministic scoring logic.

## Planned AI Agents

- Company Agent
- Financial Agent
- News Agent
- Risk Agent
- Moat Agent
- Investment Committee Agent

### Why Separate Agents

Each agent has one job.

This improves:

- prompt clarity
- maintainability
- debugging
- testability
- interview explainability

## Prompt Strategy

Prompts will live in `backend/prompts/`.

Examples:

- `companyPrompt.js`
- `fundamentalPrompt.js`
- `sentimentPrompt.js`
- `riskPrompt.js`
- `moatPrompt.js`
- `committeePrompt.js`

### Why Prompts Are Separate

- routes should coordinate requests, not contain prompt text
- prompts will likely evolve independently of control flow
- separate prompt files make it easier to compare iterations
- interviewers often ask where prompt engineering decisions live

## Planned Backend Folder Structure

```text
backend/
  config/
  controllers/
  routes/
  services/
  agents/
  graph/
  prompts/
  middleware/
  utils/
  validators/
  database/
```

### Folder Responsibilities

- `config/`: environment setup, API clients, application constants
- `controllers/`: HTTP-level request and response handling
- `routes/`: Express route definitions
- `services/`: business logic and external API orchestration
- `agents/`: focused AI agent wrappers
- `graph/`: LangGraph state, nodes, and flow wiring
- `prompts/`: prompt templates and prompt-building helpers
- `middleware/`: shared Express middleware such as error handling
- `utils/`: pure helpers and reusable formatting logic
- `validators/`: request validation rules
- `database/`: schema, queries, and persistence setup

## Planned Frontend Folder Structure

```text
client/
  src/
    components/
    pages/
    hooks/
    services/
    context/
    utils/
    assets/
    charts/
```

### Folder Responsibilities

- `components/`: reusable UI building blocks
- `pages/`: route-level screens such as dashboard and history
- `hooks/`: custom React hooks for stateful UI behavior
- `services/`: API calling logic using Axios
- `context/`: app-wide state that genuinely needs sharing
- `utils/`: formatting and small pure helpers
- `assets/`: static assets
- `charts/`: chart-focused presentation components using Recharts

## Planned API Design

The backend will expose REST endpoints with consistent response shapes.

Initial candidates:

- `POST /api/research`
- `GET /api/research/history`
- `GET /api/research/:id`

### Response Shape

Successful responses should follow a predictable structure:

```json
{
  "success": true,
  "data": {},
  "message": "Research completed successfully"
}
```

Failure responses should also be consistent:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Company name is required"
  }
}
```

## Error Handling Plan

The backend should explicitly handle:

- invalid company names
- missing API keys
- Gemini API failures
- financial API failures
- news API failures
- rate limits
- network errors
- malformed model output

The goal is to fail clearly, not mysteriously.

## Database Direction

PostgreSQL will be introduced when we are ready to persist research history.

Planned stored fields:

- company name
- research date
- decision
- confidence
- sources
- score

### Normalization Direction

A likely normalized design will separate:

- `research_runs` for one row per analysis
- optional related tables for `sources` if we want cleaner querying and less duplication

We will only add the database when it is clearly useful, so early development stays focused.

## UI Direction

The frontend will present:

- company search
- progress timeline
- research cards
- financial metrics
- news sentiment
- risk report
- moat analysis
- overall score
- confidence
- final recommendation
- search history
- charts

The UI goal is professional and easy to explain, not flashy for its own sake.

## Development Plan

We will build incrementally.

Suggested order:

1. Define architecture and folder structure
2. Initialize backend
3. Initialize frontend
4. Add company research API contract
5. Add Gemini configuration
6. Define graph state
7. Build graph nodes one by one
8. Add deterministic scoring
9. Build dashboard UI
10. Add persistence
11. Improve docs and interview preparation

## Interview Explanation

If an interviewer asks why this architecture was chosen, a strong answer is:

“Investment research is naturally multi-step. Instead of relying on one large prompt, I designed the system as a LangGraph workflow with focused agents for fundamentals, sentiment, risk, and moat analysis. I kept final recommendation logic deterministic so the AI explains the outcome rather than deciding it arbitrarily. That made the application easier to debug, maintain, and defend in an interview.”

## Git Strategy

After this file, a realistic commit would be:

```bash
git add README.md
git commit -m "docs: define AlphaLens AI architecture and development plan"
```

Pushing is not necessary yet unless you want an early checkpoint in the remote repository.
