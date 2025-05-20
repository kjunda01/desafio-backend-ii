import { useContext } from "react";
import { ClientesContext } from "../contexts/ClientesContext";

const useClientes = () => {
  const context = useContext(ClientesContext);
  if (!context) {
    throw new Error("useClientes deve ser usado dentro de um ClientesProvider");
  }
  return context;
};

export default useClientes;
