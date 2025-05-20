import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
  const BACKEND = import.meta.env.VITE_BACKEND_URL;
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({});

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    const getAll = await axios.get(`${BACKEND}/produtos`);
    setProdutos(getAll.data);
    return getAll.data;
  };

  const getSingle = async (id) => {
    if (!id) return null;
    const response = await axios.get(`${BACKEND}/produtos/${id}`);
    setProduto(response.data);
    return response.data;
  };

  const update = async (produto) => {
    const response = await axios.put(`${BACKEND}/produtos/${produto.id}`, produto);
    await getAll();
    return response.data;
  };

  const create = async (produto) => {
    const response = await axios.post(`${BACKEND}/produtos`, produto);
    await getAll();
    return response.data;
  };

  const remove = async (id) => {
    const remove = await axios.delete(`${BACKEND}/produtos/${id}`);
    await getAll();
    return remove.data;
  };

  return (
    <ProdutosContext.Provider value={{ produto, setProduto, produtos, setProdutos, getAll, getSingle, update, create, remove }}>
      {children}
    </ProdutosContext.Provider>
  );
};
