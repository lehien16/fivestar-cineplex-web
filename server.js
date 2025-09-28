const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: "utf8mb4"
});

app.get("/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("API FiveStar đang chạy! Dùng /movies để lấy dữ liệu.");
});

app.listen(PORT, () => console.log(`Server chạy cổng ${PORT}`));
