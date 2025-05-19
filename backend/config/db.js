import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
});

const bancoDeDados = connection.promise();

// Teste de conexão simples
bancoDeDados
  .query("SELECT 1")
  .then(() => {
    console.log("✅ Conectado ao banco de dados com sucesso.");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco de dados:", err);
  });

export default bancoDeDados;
