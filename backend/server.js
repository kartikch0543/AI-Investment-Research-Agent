const app = require("./src/app");
const { env } = require("./src/config/env");

app.listen(env.port, () => {
  console.log(`AlphaLens backend running on port ${env.port}`);
});
