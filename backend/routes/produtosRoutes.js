import { Router } from "express";
import { produtosController } from "../controllers/produtosController.js";
import { produtosMiddleware } from "../middlewares/produtosMiddleware.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js";

const produtosRoutes = Router();

produtosRoutes.get("/", cacheMiddleware, produtosController.readAll);
produtosRoutes.get("/:id", cacheMiddleware, produtosMiddleware.verificaID, produtosController.readSingle);
produtosRoutes.post("/", produtosMiddleware.validaProduto, produtosController.create);
produtosRoutes.put("/:id", produtosMiddleware.verificaID, produtosMiddleware.validaProduto, produtosController.update);
produtosRoutes.delete("/:id", produtosMiddleware.verificaID, produtosController.remove);

export default produtosRoutes;
