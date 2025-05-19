import { cacheService } from "../services/cacheService.js";
import { clientesService } from "../services/clientesService.js";
import chalk from "chalk";

const readAll = async (req, res) => {
  const resultado = await await clientesService.readAll();
  cacheService.flush();
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após GET"));
  return resultado ? res.status(200).json(resultado) : res.status(400).json({ message: "Falha ao encontrar clientes" });
};

const readSingle = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const resultado = await await clientesService.readSingle(id);
  cacheService.flush();
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após GET"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao encontrar cliente específico" });
};

const create = async (req, res) => {
  const { cliente } = req.body;
  const resultado = await await clientesService.create(cliente);
  cacheService.flush();
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao salvar cliente" });
};

const update = async (req, res) => {
  const resultado = await await clientesService.update(req.body);
  cacheService.flush();
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao atualizar cliente" });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const resultado = await await clientesService.remove(id);
  cacheService.flush();
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após DELETE"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao remover cliente" });
};

export const clientesController = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
