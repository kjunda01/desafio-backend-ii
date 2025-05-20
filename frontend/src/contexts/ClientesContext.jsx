import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const BACKEND = import.meta.env.VITE_BACKEND_URL;
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const getAll = await axios.get(`${BACKEND}/clientes`);
    setClientes(getAll.data);
    return getAll.data;
  };

  const getSingle = async (id) => {
    if (!id) return null;
    const response = await axios.get(`${BACKEND}/clientes/${id}`);
    setCliente(response.data);
    return response.data;
  };

  const update = async (cliente) => {
    const response = await axios.put(`${BACKEND}/clientes/${cliente.id}`, cliente);
    await getAll();
    return response.data;
  };

  const create = async (cliente) => {
    const response = await axios.post(`${BACKEND}/clientes`, cliente);
    await getAll();
    return response.data;
  };

  const remove = async (id) => {
    const remove = await axios.delete(`${BACKEND}/clientes/${id}`);
    await getAll();
    return remove.data;
  };

  return (
    <ClientesContext.Provider value={{ cliente, setCliente, clientes, setClientes, getAll, getSingle, update, create, remove }}>
      {children}
    </ClientesContext.Provider>
  );
};
