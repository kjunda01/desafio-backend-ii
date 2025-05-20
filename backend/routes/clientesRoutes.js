import { Router } from "express";
import { clientesController } from "../controllers/clientesController.js";
import { clientesMiddleware } from "../middlewares/clientesMiddleware.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js";

const clientesRoutes = Router();

clientesRoutes.get("/", cacheMiddleware, clientesController.readAll);
clientesRoutes.get("/:id", cacheMiddleware, clientesMiddleware.verificaID, clientesController.readSingle);
clientesRoutes.post("/", clientesMiddleware.verificaEmail, clientesMiddleware.validaCliente, clientesController.create);
clientesRoutes.put("/:id", clientesMiddleware.verificaID, clientesMiddleware.validaCliente, clientesController.update);
clientesRoutes.delete("/:id", clientesMiddleware.verificaID, clientesController.remove);

export default clientesRoutes;
