import bancoDeDados from "../config/db.js";
import { formatarDataParaSQL } from "../utils/formatarDataParaSQL.js";

// CREATE
const create = async (produto) => {
  const query = "INSERT INTO produtos(nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)";
  const dataFormatada = formatarDataParaSQL(produto.data_atualizado);
  const [result] = await bancoDeDados.execute(query, [produto.nome, produto.descricao, produto.preco, dataFormatada]);
  return result.affectedRows === 1;
};

// READ ALL
const readAll = async () => {
  const query = "SELECT * FROM produtos";
  const [rows] = await bancoDeDados.execute(query);
  return rows;
};

// READ SINGLE
const readSingle = async (id) => {
  const query = "SELECT * FROM produtos WHERE id = ?";
  const rows = await bancoDeDados.execute(query, [id]);
  return rows;
};

// UPDATE
const update = async (produto) => {
  const query = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?";
  const dataFormatada = formatarDataParaSQL(produto.data_atualizado);
  const [result] = await bancoDeDados.execute(query, [
    produto.nome,
    produto.descricao,
    produto.preco,
    dataFormatada,
    produto.id,
  ]);
  return result.affectedRows === 1;
};

// DELETE
const remove = async (id) => {
  const query = "DELETE FROM produtos WHERE id = ?";
  const [result] = await bancoDeDados.execute(query, [id]);
  return result.affectedRows === 1;
};

export const produtosService = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
