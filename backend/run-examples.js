const { runResearch } = require("./src/services/researchOrchestrator");
const fs = require("fs");
const path = require("path");

async function runAll() {
  const companies = ["Tesla", "Apple", "NVIDIA", "Microsoft"];
  const reports = {};

  console.log("Starting research runs for companies...");
  for (const company of companies) {
    console.log(`\n======================================\nRunning research for ${company}...\n======================================`);
    try {
      const result = await runResearch(company);
      reports[company] = {
        decision: result.decision,
        confidence: result.confidence,
        overallScore: result.overallScore,
        scoreBreakdown: result.scoreBreakdown,
        reasoning: result.reasoning,
        strengths: result.strengths,
        weaknesses: result.weaknesses
      };
      console.log(`Completed ${company}: Decision = ${result.decision}, Score = ${result.overallScore}`);
    } catch (err) {
      console.error(`Failed research for ${company}:`, err);
    }
  }

  const outputPath = path.join(__dirname, "example-runs-output.json");
  fs.writeFileSync(outputPath, JSON.stringify(reports, null, 2));
  console.log(`\nAll example runs saved to ${outputPath}`);
}

runAll();
