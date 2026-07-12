# TradeIntel AI

TradeIntel AI (formerly AlphaLens AI) is a state-of-the-art multi-agent investment research application that orchestrates specialized AI agents to analyze a company and produce a structured, deterministic recommendation. 

**Vercel Production Deployment:** [https://tradeintel-ai.vercel.app/](https://tradeintel-ai.vercel.app/)

**Public Zip Download Link:** [https://github.com/kartikch0543/AI-Investment-Research-Agent/archive/refs/heads/main.zip](https://github.com/kartikch0543/AI-Investment-Research-Agent/archive/refs/heads/main.zip)

---

## Table of Contents
- [Overview](#overview)
- [How to Run It](#how-to-run-it)
- [How It Works (Approach & Architecture)](#how-it-works-approach--architecture)
- [Key Decisions & Trade-Offs](#key-decisions--trade-offs)
- [Example Runs & Reports](#example-runs--reports)
- [Future Improvements](#future-improvements)
- [Bonus: LLM Chat Transcripts & Logs](#bonus-llm-chat-transcripts--logs)

---

## Overview

TradeIntel AI performs comprehensive security analysis by dividing the research process among focused autonomous agents. It takes a single input—a company name (e.g., Apple, Tesla, NVIDIA, Microsoft)—and automatically gathers financial details, news sentiment, competitive moat qualities, and risk profiles. The system merges these results using a **deterministic weighted scoring engine** and presents the synthesized thesis through an elegant, interactive React interface.

### Key Features
* **Multi-Agent Research Pipeline:** Powered by LangGraph.js, executing specialized agents in parallel.
* **Deterministic Scoring Engine:** Eliminates LLM "hallucination" in recommendations by basing decisions strictly on audited numeric scores.
* **Intelligent Model Router:** Dynamic provider routing (Gemini 2.5 Flash on OpenRouter/Google, DeepSeek-Chat, Qwen 3.6-Flash) with transparent fallback logic.
* **Interactive AI Copilot (Chat):** Chat directly with an AI assistant contextualized on the generated research report.
* **Beautiful Dashboard UI:** Modern dark-themed layout with responsive visualizations, progress trackers, and history management.

---

## How to Run It

The project is structured as a monorepo with a `client` (React/Vite) and `backend` (Node/Express).

### Prerequisites
* **Node.js** (v18+)
* **npm**
* **PostgreSQL Database** (Optional, for storing/loading session history via Prisma. You can run locally or use a cloud provider like Neon.tech)

---

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Environment Variables by creating a `.env` file (`.env.example` is provided for reference):
   ```env
   PORT=5000
   NODE_ENV=development
   
   # AI Provider API Keys (Pick either or both)
   GEMINI_API_KEY=your_gemini_api_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   
   # Database connection (Prisma PostgreSQL)
   DATABASE_URL=postgresql://username:password@localhost:5432/tradeintel_ai
   DIRECT_URL=postgresql://username:password@localhost:5432/tradeintel_ai
   ```
4. Run Prisma Migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

---

### Client (Frontend) Setup

1. Navigate to the client folder:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your Environment Variables by creating a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_firebase_key
   # Add additional Firebase credentials as needed for user authentication
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

---

## How It Works (Approach & Architecture)

TradeIntel AI's architecture is split into a modular system where business logic, prompts, and agent coordination are decoupled:

```
START
  -> Gather Information (Profile, Financials, News)
  -> Branch into parallel analysis
     -> Fundamental Analysis Agent
     -> News Sentiment Analysis Agent
     -> Risk Analysis Agent
     -> Moat & Business Quality Agent
  -> Merge Results & Execute Deterministic Scoring
  -> Investment Committee Agent (Reasoning Synthesis)
  -> END
```

### 1. LangGraph Orchestration
The core logic resides in a state graph that manages flow control and aggregates information into a shared state:
* **Gather Information Node:** Centralizes raw data retrieval (financial metrics, news headlines) so downstream agents run with the same raw information context.
* **Analysis Nodes (Parallel):** Small, single-responsibility agents execute in parallel to grade distinct aspects of the target company.
* **Merge Results Node:** Combines partial analysis outputs and feeds them into the scoring engine.
* **Investment Committee Node:** Synthesizes the final thesis explanation based on the calculated score, strengths, and weaknesses.

### 2. Pluggable Model Router
To maximize resilience, cost-effectiveness, and execution speed, we implement a custom Model Router over a Provider Pattern:
* **Narrow Analytical Tasks:** (Fundamentals, Risk, Moat) are routed to **`deepseek/deepseek-chat`** due to its high analytical structuring capabilities.
* **High-Throughput Text Summarization:** (News Sentiment) is routed to **`qwen/qwen3.6-flash`** for rapid summarization.
* **Executive Synthesis:** (Investment Committee Node) is routed to **`google/gemini-2.5-flash`** for superior reasoning and large context synthesis.
* **Transparent Failover:** If a primary provider rate-limits (HTTP 429) or times out, the service automatically redirects requests to pre-configured fallbacks without interrupting the user experience.

### 3. Deterministic Decision Framework
Instead of allowing LLMs to randomly output recommendations, TradeIntel AI uses a strict math-based scoring engine:
* **Financial Health:** 40%
* **News Sentiment:** 20%
* **Moat/Business Quality:** 20%
* **Risk (Inverted):** 20%

**Final Recommendation Thresholds:**
* `80 - 100`: **BUY**
* `60 - 79`: **WATCHLIST**
* `0 - 59`: **PASS**

---

## Key Decisions & Trade-Offs

### 1. Deterministic Recommendation vs. Generative Recommendations
* **Decision:** We hardcoded the final verdict mapping (`BUY`/`WATCHLIST`/`PASS`) based on weighted scores rather than letting the LLM choose.
* **Why:** In finance, compliance and auditability are crucial. Generative models can change their recommendation based on minor prompt adjustments. With deterministic scoring, we can explain exactly which component dragged down the grade.
* **Trade-Off:** It reduces the "creative intuition" of the AI, but guarantees repeatability.

### 2. Node.js & Express vs. Python (LangChain/LangGraph)
* **Decision:** Built the backend entirely in Javascript using Node.js, Express, and LangChain.js/LangGraph.js.
* **Why:** Enables seamless sharing of types and structures with the React frontend, low latency, and makes it incredibly easy to package as a web app.
* **Trade-Off:** The Python ecosystem is larger for machine learning and data science, but JS is far superior for building interactive SaaS platforms.

### 3. Prisma + Postgres Persistence
* **Decision:** Fully integrated Prisma ORM with Neon Serverless Postgres.
* **Why:** Provides robust storage for research history and user search patterns.
* **Trade-Off:** Adds database maintenance overhead but elevates the project from a simple sandbox demo to a production-grade application.

---

## Example Runs & Reports

We evaluated 4 major technology companies using the TradeIntel AI multi-agent research pipeline:

### 1. Tesla (`WATCHLIST` · Score: 74/100 · Confidence: 70%)
> **Investment Committee Summary:** Tesla exhibits robust fundamentals (82 Financial Health), driven by 18% YoY revenue growth and a conservative 0.18x debt-to-equity ratio. Its competitive moat (88) is built on dominant brand recognition, proprietary vertical integration, and an industry-leading Supercharger network. However, market sentiment (58) reflects skepticism around valuation multiples and intensifying EV competition. A valuation disconnect relative to current operating margins and the execution risk of platform monetization warrant a cautious stance. We recommend placing Tesla on the WATCHLIST until margin stabilization is visible.

* **Strengths:** 
  * Strong revenue growth (18% YoY) and conservative capital structure (0.18x D/E).
  * Dominant brand, proprietary vertical integration, and extensive Supercharger network.
  * Strategic enterprise partnerships and energy market diversification.
* **Weaknesses:**
  * Operating margins (11%) remain below best-in-class peers.
  * Significant valuation premium relative to current automotive peers.

### 2. Apple (`WATCHLIST` · Score: 75/100 · Confidence: 75%)
> **Investment Committee Summary:** Apple exhibits robust fundamentals with an exceptional 30% operating margin and solid 9% revenue growth, underscoring its pricing power. Apple's ecosystem lock-in, proprietary silicon, and high-margin services revenue (growing at 15%+ annually) create a formidable moat. However, an elevated debt-to-equity ratio of 1.45x and intensifying competitive pressures in hardware segments warrant caution. Near-term risk/reward appears balanced, suggesting a WATCHLIST recommendation.

* **Strengths:**
  * Exceptional operating margin of 30% reflecting supply chain efficiency.
  * Unmatched ecosystem lock-in with high consumer switching costs.
  * Recurring services revenue growing at 15%+ annually with 70%+ gross margins.
* **Weaknesses:**
  * Elevated debt-to-equity of 1.45x indicates increased leverage.
  * Heavy reliance on iPhone sales (52% of revenue) as a core segment.

### 3. NVIDIA (`WATCHLIST` · Score: 72/100 · Confidence: 70%)
> **Investment Committee Summary:** NVIDIA presents a compelling long-term growth story, segmenting an unassailable moat in GPU technology and a pristine financial profile. However, the current valuation premium, coupled with escalating competitive pressures and inherent cyclicality, warrants a cautious approach. While its AI hardware dominance is clear, the market has priced in the upside. We need to see sustained execution against emerging rivals and a more attractive entry point before committing capital.

* **Strengths:**
  * Dominant market position in GPU tech and CUDA software platform.
  * Exceptional revenue growth (35% YoY) and best-in-class operating margins (42%).
  * Conservative leverage profile (D/E 0.32).
* **Weaknesses:**
  * Extremely premium valuation requires sustained hypergrowth.
  * Concentration risk in cyclical enterprise datacenter end-markets.

### 4. Microsoft (`WATCHLIST` · Score: 78/100 · Confidence: 78%)
> **Investment Committee Summary:** Microsoft warrants a WATCHLIST recommendation. While the company exhibits an exceptionally wide moat (92) and robust financial health (88), current market sentiment and valuation concerns temper an immediate BUY rating. We need to see how the company navigates intensifying cloud competition and executes on its platform AI ecosystem expansion to justify its multiple.

* **Strengths:**
  * Operating margin of 44% driving best-in-class profitability.
  * Double-digit revenue growth (14%) in a mature market.
  * Dominant enterprise software ecosystem (Office 365, Azure, Windows).
* **Weaknesses:**
  * Margin expansion opportunities are limited given already high profitability.
  * Saturation signs in the broader cloud market.

---

## Future Improvements

If given more time, the following capabilities would be integrated:
1. **Real-time Live API Integrations:** Replace current mock data with production-ready financial endpoints (e.g., Financial Modeling Prep or Alpha Vantage) and live news feeds (e.g., NewsAPI or Google News RSS).
2. **PDF Report Export:** Allow users to download the comprehensive, formatted multi-agent report as a PDF directly from the dashboard.
3. **Custom Weight Configurations:** Provide an advanced settings page where users can manually adjust the weights of the deterministic scoring engine (e.g., weigh news sentiment higher).
4. **Enhanced Chat Memory:** Maintain persistent chat context in the database so that users can resume conversations with the copilot across browser sessions.

---

## Bonus: LLM Chat Transcripts & Logs

As requested, we have documented all the LLM pair-programming chat transcripts, logs, tool executions, and thought processes during the creation of this workspace. 

* **Complete Markdown Logs:** [docs/llm_chat_transcripts.md](file:///c:/Users/VICTUS/Desktop/AI%20Investment%20Research%20Agent/docs/llm_chat_transcripts.md)
* **Raw JSONL Logs:** [C:\Users\VICTUS\.gemini\antigravity-ide\brain\99ce619f-d28c-4ae6-9479-d111ba05a07a\.system_generated\logs\transcript.jsonl](file:///C:/Users/VICTUS/.gemini/antigravity-ide/brain/99ce619f-d28c-4ae6-9479-d111ba05a07a/.system_generated/logs/transcript.jsonl)

---

*Thank you for evaluating TradeIntel AI! For any questions or feedback, please visit the [Vercel Deployment](https://tradeintel-ai.vercel.app/) or read the deep-dive [Architecture Guide](file:///c:/Users/VICTUS/Desktop/AI%20Investment%20Research%20Agent/docs/architecture.md).*
