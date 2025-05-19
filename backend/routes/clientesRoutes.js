import { Router } from "express";
import { clientesController } from "../controllers/clientesController.js";
import { clientesMiddleware } from "../middlewares/clientesMiddleware.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js";

const clientesRoutes = Router();

clientesRoutes.get("/", cacheMiddleware, clientesController.readAll);
clientesRoutes.get("/:id", cacheMiddleware, clientesController.readSingle);
clientesRoutes.post("/", cacheMiddleware, clientesMiddleware.validaCliente, clientesController.create);
clientesRoutes.put("/:id", cacheMiddleware, clientesController.update);
clientesRoutes.delete("/:id", cacheMiddleware, clientesController.remove);

export default clientesRoutes;
