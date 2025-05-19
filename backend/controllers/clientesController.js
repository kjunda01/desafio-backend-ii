import { clientesService } from "../services/clientesService.js";

const create = async (req, res) => {
  const { cliente } = req.body;
  const resultado = await await clientesService.create(cliente);
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao salvar cliente" });
};

const readAll = async (req, res) => {
  const resultado = await await clientesService.readAll();
  return resultado ? res.status(200).json(resultado) : res.status(400).json({ message: "Falha ao encontrar clientes" });
};

const readSingle = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const resultado = await await clientesService.readSingle(id);
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao encontrar cliente específico" });
};

const update = async (req, res) => {
  const resultado = await await clientesService.update(req.body);
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao atualizar cliente" });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const resultado = await await clientesService.remove(id);
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao remover cliente" });
};

export const clientesController = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
