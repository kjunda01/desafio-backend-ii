import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TabelaClientes from "./components/TabelaClientes";

const App = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obterClientes = async () => {
      const getAll = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/clientes`);
      console.log(getAll);
      setClientes(getAll.data);
    };
    obterClientes();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-blue-100">
      {/* Parte do título */}
      <div className="flex flex-1 items-center">
        <h1 className="text-2xl font-bold font-mono p-3 border rounded-sm bg-blue-200 text-center">
          <span>Frontend para o</span> <span className="italic underline">Desafio Backend II</span>
        </h1>
      </div>

      {/* Parte dos testes */}
      <div className="flex flex-2/3 gap-3 p-3">
        {/* Clientes */}
        <div className="flex flex-col w-full h-fit border rounded-sm items-start justify-center p-3">
          {/* Tabela clientes */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="p-3 font-bold text-center text-3xl">Clientes</h2>
            <TabelaClientes clientes={clientes} />
          </div>
        </div>

        {/* Produtos */}
        <div className="flex flex-col w-full h-fit border rounded-sm items-start justify-center p-3">
          {/* Tabela clientes */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="p-3 font-bold text-center text-3xl">Clientes</h2>
            <TabelaClientes clientes={clientes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
