const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 3000;

app.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const text = `📊 Dex Webhook Received:\n${JSON.stringify(payload, null, 2)}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown"
      })
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error:", err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("✅ uhu-dex-webhook is live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

