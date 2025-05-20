import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";

export const ProdutosContext = createContext();

export const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    dataAtualizado: "",
  });

  useEffect(() => {
    const obterProdutos = async () => {
      const getAll = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/produtos`);
      setProdutos(getAll.data);
    };
    obterProdutos();
  }, []);

  return <ProdutosContext.Provider value={{ produtos, setProdutos, produto, setProduto }}>{children}</ProdutosContext.Provider>;
};
