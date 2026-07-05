CREATE TABLE research_runs (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(120) NOT NULL,
  decision VARCHAR(30) NOT NULL,
  confidence INTEGER NOT NULL,
  overall_score INTEGER NOT NULL,
  reasoning TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research_sources (
  id SERIAL PRIMARY KEY,
  research_run_id INTEGER NOT NULL REFERENCES research_runs(id) ON DELETE CASCADE,
  source_type VARCHAR(50) NOT NULL,
  source_label TEXT NOT NULL
);
