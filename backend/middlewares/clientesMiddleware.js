import bancoDeDados from "../config/db.js";
import { isValidParam } from "../utils/isValidParam.js";
import createError from "http-errors";

// Middleware: Validação dos dados do cliente
const validaCliente = (req, res, next) => {
  const { nome, sobrenome, email, idade } = req.body;

  if (!isValidParam(nome, sobrenome, email, idade)) {
    return next(createError(400, "Parâmetros obrigatórios ausentes ou inválidos."));
  }

  const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idadeNum = parseInt(idade, 10);
  const idadeValida = Number.isInteger(idadeNum) && idadeNum >= 0 && idadeNum <= 130;
  const erros = [];

  if (!nome || !nomeRegex.test(nome)) {
    erros.push("Nome inválido. Use apenas letras e espaços.");
  }

  if (!sobrenome || !nomeRegex.test(sobrenome)) {
    erros.push("Sobrenome inválido. Use apenas letras e espaços.");
  }

  if (!email || !emailRegex.test(email)) {
    erros.push("E-mail inválido.");
  }

  if (!idadeValida) {
    erros.push("Idade inválida. Deve ser um número entre 0 e 130.");
  }

  if (erros.length > 0) {
    return next(createError(400, { message: "Validação falhou", errors: erros.join("\n") }));
  }

  next();
};

const verificaID = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidParam(id)) {
      throw createError(400, "ID inválido ou ausente.");
    }

    const query = "SELECT * FROM clientes WHERE id = ?";
    const [rows] = await bancoDeDados.execute(query, [id]);

    if (rows.length === 0) {
      throw createError(404, "ID não encontrado na base de dados.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

const verificaEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!isValidParam(email)) {
      throw createError(400, "Email ausente ou inválido.");
    }

    const query = "SELECT * FROM clientes WHERE email = ?";
    const [rows] = await bancoDeDados.execute(query, [email]);

    if (rows.length > 0) {
      throw createError(409, "Email já cadastrado.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const clientesMiddleware = { validaCliente, verificaID, verificaEmail };
