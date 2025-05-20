import bancoDeDados from "../config/db.js";
import { isValidParam } from "../utils/isValidParam.js";
import createError from "http-errors";

// Middleware: Validação dos dados do produto
const validaProduto = (req, res, next) => {
  const { nome, descricao, preco, data_atualizado } = req.body;

  if (!isValidParam(nome, descricao, preco, data_atualizado)) {
    return next(createError(400, "Parâmetros obrigatórios ausentes ou inválidos."));
  }

  const nomeProdutoRegex = /^[A-Za-zÀ-ÿ0-9\s.,;:!?()\-'"°ºª]{2,100}$/;
  const descricaoRegex = /^[\s\S]{5,1000}$/;
  const precoRegex = /^(?:\d+)(?:[.,]\d{1,2})?$/;
  const dataRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{3}Z)?)?$/;

  const precoNum = parseFloat(preco.replace(",", "."));

  const dataValida = dataRegex.test(data_atualizado) && !isNaN(new Date(data_atualizado).getTime());

  const erros = [];

  if (!nome || !nomeProdutoRegex.test(nome)) {
    erros.push("Nome inválido. Use entre 2 e 100 caracteres, incluindo letras, números e pontuação simples.");
  }

  if (!descricao || !descricaoRegex.test(descricao)) {
    erros.push("Descrição inválida. Deve conter entre 5 e 1000 caracteres.");
  }

  if (!preco || !precoRegex.test(preco) || isNaN(precoNum) || precoNum <= 0) {
    erros.push("Preço inválido. Use um valor numérico positivo com até duas casas decimais.");
  }

  if (!dataValida) {
    erros.push("Data de atualização inválida. Use o formato YYYY-MM-DDTHH:mm.");
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

    const query = "SELECT * FROM produtos WHERE id = ?";
    const [rows] = await bancoDeDados.execute(query, [id]);

    if (rows.length === 0) {
      throw createError(404, "ID não encontrado na base de dados.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const produtosMiddleware = { validaProduto, verificaID };
