# Backend Notes

## Why This Folder Exists

The backend owns:

- API routes
- LangGraph orchestration
- AI agents
- deterministic scoring
- validation
- error handling

## Execution Flow

1. `server.js` starts Express.
2. `src/app.js` wires middleware and routes.
3. `POST /api/research` validates the request.
4. `researchOrchestrator` creates the initial graph state.
5. `researchGraph` runs gather, analysis, merge, and committee nodes.
6. `scoringService` computes the final recommendation deterministically.
7. The controller returns a normalized response to the client.

## Interview Angle

If asked why the backend is structured this way:

“Controllers stay thin, services own orchestration, agents own AI-specific responsibilities, and prompts stay separate so changes in reasoning strategy do not force changes in HTTP code.”
