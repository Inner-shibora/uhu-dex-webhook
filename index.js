const express = require('express');
const fetch = require('node-fetch'); // v2
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.json());

app.post('/', async (req, res) => {
  const { pair, price, tx } = req.body;

  // กำหนดข้อความแจ้งเตือนที่ส่งเข้า Telegram
  const message = `📈 TX: ${tx || 'N/A'}\n🪙 Pair: ${pair || 'N/A'}\n💵 Price: ${price || 'N/A'}`;
  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    res.status(200).send('✅ Message sent to Telegram');
  } catch (error) {
    console.error('❌ Error sending to Telegram:', error);
    res.status(500).send('❌ Failed to send message');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server running on port ${PORT}`);
});
