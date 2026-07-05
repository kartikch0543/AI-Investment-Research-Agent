const { runResearch } = require("./src/services/researchOrchestrator");

async function test() {
  console.log("Starting research graph test with Gemini 2.5...");
  try {
    const result = await runResearch("Tesla");
    console.log("Research successfully completed!");
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("Research failed:", err);
  }
}

test();
