import { cacheService } from "../services/cacheService.js";
import { produtosService } from "../services/produtosService.js";
import chalk from "chalk";
import createError from "http-errors";

const readAll = async (req, res, next) => {
  try {
    const resultado = await produtosService.readAll();
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado || resultado.length === 0) {
      throw createError(404, "Falha ao encontrar produtos");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const readSingle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await produtosService.readSingle(id);
    console.log(chalk.yellowBright("Requisição GET"));

    if (!resultado[0] || resultado[0].length === 0) {
      throw createError(404, "Falha ao encontrar produto específico");
    }
    return res.status(200).json(resultado[0]);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const produto = req.body;
    const resultado = await produtosService.create(produto);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição POST"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após POST"));
    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao salvar produto");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const resultado = await produtosService.update(req.body);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição PUT"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após PUT"));
    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao atualizar produto");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await produtosService.remove(id);
    cacheService.flush();
    console.log(chalk.yellowBright("Requisição DELETE"));
    console.log(chalk.yellowBright("[CACHE] Cache invalidado após DELETE"));

    if (!resultado || resultado.length === 0) {
      throw createError(400, "Falha ao remover produto");
    }
    return res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export const produtosController = {
  create,
  readAll,
  readSingle,
  update,
  remove,
};
