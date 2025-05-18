import { Router } from "express";
import { clientesController } from "../controllers/clientesController.js";

const clientesRoutes = Router();

clientesRoutes.post("/", clientesController.create);
clientesRoutes.get("/", clientesController.readAll);
clientesRoutes.get("/:id", clientesController.readSingle);
clientesRoutes.put("/", clientesController.update);
clientesRoutes.delete("/:id", clientesController.remove);

export default clientesRoutes;
