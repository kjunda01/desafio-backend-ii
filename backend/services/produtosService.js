import bancoDeDados from "../config/db.js";

// CREATE
const create = async (cliente) => {
  const query = "INSERT INTO produtos(nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)";
  const [result] = await bancoDeDados.execute(query, [cliente.nome, cliente.descricao, cliente.preco, cliente.data_atualizado]);
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
const update = async (cliente) => {
  const query = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = ? WHERE id = ?";
  const [result] = await bancoDeDados.execute(query, [
    cliente.nome,
    cliente.descricao,
    cliente.preco,
    cliente.data_atualizado,
    cliente.id,
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
