const app = require("./src/app");
const { env } = require("./src/config/env");

app.listen(env.port, () => {
  console.log(`TradeIntel backend running on port ${env.port}`);
});
