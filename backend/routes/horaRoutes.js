import { Router } from "express";
import { horaController } from "../controllers/horaController.js";

const horaRoutes = Router();

horaRoutes.get("/", horaController.getHora);

export default horaRoutes;
