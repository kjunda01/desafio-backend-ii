import { useEffect } from "react";
import { useState } from "react";
import TabelaClientes from "./components/TabelaClientes";
import TabelaProdutos from "./components/TabelaProdutos";
import { ClientesProvider } from "./contexts/ClientesContext";


const App = () => {
  const [produtos, setProdutos] = useState([]);

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
            <ClientesProvider>
              <TabelaClientes />
            </ClientesProvider>
          </div>
        </div>

        {/* Produtos */}
        <div className="flex flex-col w-full h-fit border rounded-sm items-start justify-center p-3">
          {/* Tabela produtos */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="p-3 font-bold text-center text-3xl">Produtos</h2>

            <TabelaProdutos produtos={produtos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
