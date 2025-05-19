import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    idade: "",
  });



  useEffect(() => {
    const obterClientes = async () => {
      const getAll = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clientes`);
      setClientes(getAll.data);
    };
    obterClientes();
  }, []);

  

  return <ClientesContext.Provider value={{ clientes, setClientes, cliente, setCliente }}>{children}</ClientesContext.Provider>;
};
