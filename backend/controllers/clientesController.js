import { cacheService } from "../services/cacheService.js";
import { clientesService } from "../services/clientesService.js";
import chalk from "chalk";

const readAll = async (req, res) => {
  const resultado = await clientesService.readAll();
  console.log(chalk.yellowBright("Requisição GET"));
  return resultado ? res.status(200).json(resultado) : res.status(400).json({ message: "Falha ao encontrar clientes" });
};

const readSingle = async (req, res) => {
  const { id } = req.params;
  const resultado = await clientesService.readSingle(id);
  console.log(chalk.yellowBright("Requisição GET"));
  return resultado ? res.status(200).json(resultado[0]) : res.status(400).json({ message: "Falha ao encontrar cliente específico" });
};

const create = async (req, res) => {
  const cliente = req.body;
  const resultado = await clientesService.create(cliente);
  cacheService.flush();
  console.log(chalk.yellowBright("Requisição POST"));
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao salvar cliente" });
};


const update = async (req, res) => {
  const resultado = await clientesService.update(req.body);
  cacheService.flush();
  console.log(chalk.yellowBright("Requisição PUT"));
  console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));
  return resultado ? res.status(200).json() : res.status(400).json({ message: "Falha ao atualizar cliente" });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const resultado = await clientesService.remove(id);
  cacheService.flush();
  console.log(chalk.yellowBright("Requisição DELETE"));
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
