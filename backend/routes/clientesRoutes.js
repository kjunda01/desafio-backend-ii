import { Router } from "express";
import { clientesController } from "../controllers/clientesController.js";
import { clientesMiddleware } from "../middlewares/clientesMiddleware.js";

const clientesRoutes = Router();

clientesRoutes.post("/", clientesMiddleware.validaCliente, clientesController.create);
clientesRoutes.get("/", clientesController.readAll);
clientesRoutes.get("/:id", clientesController.readSingle);
clientesRoutes.put("/:id", clientesController.update);
clientesRoutes.delete("/:id", clientesController.remove);

export default clientesRoutes;
