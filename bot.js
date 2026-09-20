const bedrock = require("bedrock-protocol");

const HOST = "ssafe77.aternos.me";
const PORT = 54809;
const BOT_NAME = "SafeBot";

function connect() {
  console.log("Connecting to Minecraft...");

  const client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: BOT_NAME,
    offline: true
  });

  client.on("join", () => {
    console.log("✅ Bot joined the server!");
  });

  client.on("spawn", () => {
    console.log("🟢 Bot spawned in the world!");
  });

  client.on("disconnect", (reason) => {
    console.log("❌ Bot disconnected:", reason);
    reconnect();
  });

  client.on("error", (err) => {
    console.log("⚠️ Error:", err.message);
  });

  function reconnect() {
    console.log("🔄 Reconnecting in 10 seconds...");
    setTimeout(connect, 10000);
  }
}

connect();
