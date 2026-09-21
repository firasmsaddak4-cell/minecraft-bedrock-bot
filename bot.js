const bedrock = require("bedrock-protocol");

const HOST = process.env.MC_HOST || "safe77.aternos.me";
const PORT = Number(process.env.MC_PORT || 54809);
const BOT_NAME = process.env.BOT_NAME || "Safe77Bot";

console.log("=================================");
console.log(" Minecraft Bedrock Bot");
console.log(" Version: 1.21.130");
console.log("=================================");
console.log("Server: " + HOST + ":" + PORT);
console.log("Bot: " + BOT_NAME);

function connectBot() {
    console.log("Connecting...");

    const client = bedrock.createClient({
        host: HOST,
        port: PORT,
        username: BOT_NAME,
        offline: true,
        version: "1.21.130"
    });

    client.on("join", () => {
        console.log("Bot joined the server!");
    });

    client.on("spawn", () => {
        console.log("Bot spawned!");
    });

    client.on("text", (packet) => {
        if (packet.message) {
            console.log("[CHAT] " + packet.message);
        }
    });

    client.on("disconnect", (packet) => {
        console.log("Bot disconnected:", packet);
    });

    client.on("error", (error) => {
        console.log("Bot error:", error.message);
    });

    client.on("close", () => {
        console.log("Connection closed.");
        console.log("Reconnecting in 10 seconds...");

        setTimeout(() => {
            connectBot();
        }, 10000);
    });
}

connectBot();
