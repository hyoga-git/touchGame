require('dotenv').config(); // dotenv パッケージを読み込む
const pg = require("pg");

const pool = new pg.Pool({
  // Render.comのDBの接続情報に変える
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,

  // Render.comのDBではSSLが求められる
  ssl: {
    rejectUnauthorized: false, // 証明書の検証はいったん無しで
  },
  max: 10,
});

module.exports = pool;