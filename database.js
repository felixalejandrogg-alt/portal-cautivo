
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data.db');

// Crear tablas si no existen
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ad_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Usuario de ejemplo
db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
  if (row.count === 0) {
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", ["admin", "1234"]);
    console.log("Usuario creado: admin / 1234");
  }
});

module.exports = db;
