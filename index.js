const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");
require("dotenv").config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  bot.sendChatAction(chatId, "typing");

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "❌ ไม่สามารถตอบได้ในตอนนี้";

    bot.sendMessage(chatId, aiReply);
  } catch (error) {
    console.error("AI Error:", error);
    bot.sendMessage(chatId, "❌ เกิดข้อผิดพลาดในการเชื่อมต่อ AI");
  }
});
