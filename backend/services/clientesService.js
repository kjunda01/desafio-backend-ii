import bancoDeDados from "../config/db.js";

// CREATE
const create = async (cliente) => {
  const query = "INSERT INTO clientes(nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)";
  const [result] = await bancoDeDados.execute(query, [
    cliente.nome,
    cliente.sobrenome,
    cliente.email,
    cliente.idade,
  ]);
  return result.affectedRows === 1;
};

// READ ALL
const readAll = async () => {
  const query = "SELECT * FROM clientes";
  const [rows] = await bancoDeDados.execute(query);
  return rows;
};

// READ SINGLE
const readSingle = async (id) => {
  const query = "SELECT * FROM clientes WHERE id = ?";
  const rows = await bancoDeDados.execute(query, [id]);
  return rows;
};

// UPDATE
const update = async (cliente) => {
  const query = "UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?";
  const [result] = await bancoDeDados.execute(query, [
    cliente.nome,
    cliente.sobrenome,
    cliente.email,
    cliente.idade,
    cliente.id,
  ]);
  return result.affectedRows === 1;
};

// DELETE
const remove = async (id) => {
  const query = "DELETE FROM clientes WHERE id = ?";
  const [result] = await bancoDeDados.execute(query, [id]);
  return result.affectedRows === 1;
};

export const clientesService = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
