# Client Notes

## Why This Folder Exists

The client is responsible for:

- collecting company input
- triggering research requests
- showing the LangGraph-inspired progress flow
- rendering score, sentiment, risk, and recommendation panels
- storing lightweight local search history

## Execution Flow

1. `main.jsx` mounts the app and wraps shared providers.
2. `App.jsx` maps routes to pages.
3. `DashboardPage.jsx` composes the search form and result panels.
4. `useResearch` owns async request and loading state.
5. `researchService` calls the backend.
6. Components render focused slices of the response.

## Interview Angle

A strong explanation is:

“I kept route pages thin and moved asynchronous logic into hooks and services. That makes the UI easier to test, easier to reason about, and less likely to turn into a monolithic dashboard file.”
