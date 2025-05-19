import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import horaRoutes from "./routes/horaRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
// import produtosRoutes from "./routes/produtosRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://192.168.1.190:3000",
      "http://192.168.1.190:5173",
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

const routes = {
  "/": horaRoutes,
  "/clientes": clientesRoutes,
  // "/produtos": produtosRoutes,
};

for (const [route, handler] of Object.entries(routes)) {
  app.use(route, handler);
}

export default app;
