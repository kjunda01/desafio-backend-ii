import { Router } from "express";
import { produtosController } from "../../controllers/produtosController.js";

const produtosRoutes = Router();

produtosRoutes.get("/", produtosController.getAll);

export default produtosRoutes;
