import { cacheService } from "../services/cacheService.js";
import { clientesService } from "../services/clientesService.js";
import chalk from "chalk";
import createError from "http-errors";

const readAll = async (req, res, next) => {
  try {
    const resultado = await clientesService.readAll();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Falha ao encontrar clientes");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await clientesService.readSingle(id);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado[0] || resultado[0].length === 0) {
      throw createError(404, "Falha ao encontrar cliente específico");
    }
    return res.status(200).json(resultado[0]);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const cliente = req.body;
    const resultado = await clientesService.create(cliente);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição POST"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao salvar cliente");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const resultado = await clientesService.update(req.body);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição PUT"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));
    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao atualizar cliente");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await clientesService.remove(id);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição DELETE"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após DELETE"));

    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao remover cliente");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const clientesController = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
