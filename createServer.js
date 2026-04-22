const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. СПОЧАТКУ налаштовуємо CORS (він має перехоплювати запити першим!)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

// 2. ПОТІМ вчимо сервер розуміти JSON
app.use(express.json());


// 3. ТІЛЬКИ ТЕПЕР оголошуємо маршрути
app.post('/registration', (req, res) => {
  console.log("Отримані дані:", req.body);
  res.status(200).json({ message: "Реєстрація успішна!" });
});

// 4. В САМОМУ КІНЦІ запускаємо сервер
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});