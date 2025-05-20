import bancoDeDados from "../config/db.js";
import { isValidParam } from "../utils/isValidParam.js";

const validaCliente = (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;

  if (!isValidParam(nome, sobrenome, email, idade)) {
    return res.status(400).json({ error: "Parâmetros inválidos." });
  }

  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idadeNum = parseInt(idade, 10);
  const idadeValida = Number.isInteger(idadeNum) && idadeNum >= 0 && idadeNum <= 130;
  const erros = [];

  if (!nome || !nomeRegex.test(nome)) {
    erros.push({ message: "Nome inválido. Use apenas letras e espaços." });
  }

  if (!sobrenome || !nomeRegex.test(sobrenome)) {
    erros.push({ message: "Sobrenome inválido. Use apenas letras e espaços." });
  }

  if (!email || !emailRegex.test(email)) {
    erros.push({ message: "E-mail inválido." });
  }

  if (!idadeValida) {
    erros.push({ message: "Idade inválida. Deve ser um número entre 0 e 130." });
  }

  if (erros.length > 0) {
    return res.status(400).json({ error: erros });
  }

  next();
};

const verificaID = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidParam(id)) {
    return res.status(400).json({ error: "Parâmetros inválidos." });
  }

  const query = "SELECT * FROM clientes WHERE id = ?";
  const [rows] = await bancoDeDados.execute(query, [id]);

  if (rows.length === 0) {
    return res.status(400).json({ error: "ID não encontrado na base de dados." });
  }

  next();
};

const verificaEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!isValidParam(email)) {
    return res.status(400).json({ error: "Parâmetros inválidos." });
  }

  const query = "SELECT * FROM clientes WHERE email = ?";
  const [rows] = await bancoDeDados.execute(query, [email]);

  if (rows.length > 0) {
    return res.status(400).json({ error: "Email ja consta na base de dados" });
  }

  next();
};

export const clientesMiddleware = { validaCliente, verificaID, verificaEmail };
