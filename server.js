const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fivestar",
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