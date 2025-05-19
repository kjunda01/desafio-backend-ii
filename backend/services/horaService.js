import bancoDeDados from "../config/db.js";

const getHora = async () => {
  const query = "SELECT NOW() AS getHora";
  const [rows] = await bancoDeDados.execute(query);
  const data = new Date(rows[0].getHora);
  const hora = data.toLocaleString('pt-BR');
  return { message: "API Ativa! Confira a hora do servidor..", hora: hora };
};

export const horaService = {
  getHora,
};
