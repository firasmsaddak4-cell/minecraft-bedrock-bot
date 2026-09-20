const bedrock = require("bedrock-protocol");

const HOST = "ssafe77.aternos.me";
const PORT = 54809;
const BOT_NAME = "SafeBot";

function connect() {
  console.log(`🌐 الاتصال بـ ${HOST}:${PORT}...`);

  let client;

  try {
    client = bedrock.createClient({
      host: HOST,
      port: PORT,
      username: BOT_NAME,
      offline: true,
      version: "1.21.131"
    });

    client.on("join", () => {
      console.log("✅ البوت دخل السيرفر!");
    });

    client.on("spawn", () => {
      console.log("🟢 البوت ظهر داخل العالم!");
    });

    client.on("disconnect", (reason) => {
      console.log("❌ تم فصل البوت:", reason);
      reconnect();
    });

    client.on("error", (err) => {
      console.log("⚠️ خطأ:", err.message);
      reconnect();
    });

  } catch (err) {
    console.log("⚠️ فشل الاتصال:", err.message);
    reconnect();
  }
}

let timer = null;

function reconnect() {
  if (timer) return;

  console.log("🔄 محاولة جديدة بعد 10 ثوانٍ...");

  timer = setTimeout(() => {
    timer = null;
    connect();
  }, 10000);
}

connect();
