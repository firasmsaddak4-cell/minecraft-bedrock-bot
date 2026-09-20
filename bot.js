const bedrock = require("bedrock-protocol");

const HOST = "ssafe77.aternos.me";
const PORT = 54809;
const BOT_NAME = "SafeBot";

let reconnectTimer = null;
let connecting = false;

function scheduleReconnect() {
  if (reconnectTimer || connecting) return;

  console.log("🔄 محاولة جديدة بعد 10 ثوانٍ...");

  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    connect();
  }, 10000);
}

function connect() {
  if (connecting) return;

  connecting = true;
  console.log(`🌐 الاتصال بـ ${HOST}:${PORT}...`);

  let client;

  try {
    client = bedrock.createClient({
      host: HOST,
      port: PORT,
      username: BOT_NAME,
      offline: true
    });

    client.on("join", () => {
      console.log("✅ البوت دخل السيرفر!");
      connecting = false;
    });

    client.on("spawn", () => {
      console.log("🟢 البوت ظهر داخل العالم!");
    });

    client.on("disconnect", (reason) => {
      console.log("❌ تم فصل البوت:", reason);
      connecting = false;
      scheduleReconnect();
    });

    client.on("error", (err) => {
      console.log("⚠️ خطأ:", err.message);
      connecting = false;
      scheduleReconnect();
    });

  } catch (err) {
    console.log("⚠️ فشل الاتصال:", err.message);
    connecting = false;
    scheduleReconnect();
  }
}

connect();
