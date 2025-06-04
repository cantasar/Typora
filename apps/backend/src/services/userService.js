const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Veritabanı dosyasını belirle
const dbPath = path.resolve(__dirname, '../../data/typora.db');
const db = new sqlite3.Database(dbPath);

// Kullanıcı tablosu yoksa oluştur
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// E-mail ile kullanıcıyı getir
function findByEmail(email) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

// Yeni kullanıcı ekle
function createUser({ name, email, password }) {
  return new Promise((resolve, reject) => {
    const stmt = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(stmt, [name, email, password], function (err) {
      if (err) return reject(err);

      resolve({
        id: this.lastID,
        name,
        email,
        createdAt: new Date().toISOString(),
      });
    });
  });
}

module.exports = {
  findByEmail,
  createUser,
};