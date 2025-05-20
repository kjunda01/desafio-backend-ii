import { useContext } from "react";
import { ProdutosContext } from "../contexts/ProdutosContext";

const useProdutos = () => {
  const context = useContext(ProdutosContext);
  if (!context) {
    throw new Error("useProdutos deve ser usado dentro de um ProdutosProvider");
  }
  return context;
};

export default useProdutos;
