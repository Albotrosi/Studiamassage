const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5500;

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  const { fullName, dob, phoneNumber, preferredDateTime } = req.body;

  const message = `New Massage Booking: Name: ${fullName} Date of Birth: ${dob} Phone Number: ${phoneNumber} Preferred Date and Time: ${preferredDateTime}`;

  const botToken = '6339368271:AAEz62ZF4Pm1wW_XP5KRjjFEEbAFHSzEiPM'; // Замените на ваш токен
  const chatId = '-1002007841427'; // Замените на ваш идентификатор чата

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  try {
    await axios.post(telegramApiUrl);

    console.log('Message sent successfully');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    console.error('Telegram API response:', error.response ? error.response.data : 'No response');

    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
