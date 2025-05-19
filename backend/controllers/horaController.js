import { horaService } from "../services/horaService.js";

const getHora = async (req, res) => {
  const resultado = await await horaService.getHora();
  return resultado ? res.status(200).json(resultado) : res.status(400).json({ message: "Falha ao encontrar a hora do banco" });
};

export const horaController = {
  getHora,
};
