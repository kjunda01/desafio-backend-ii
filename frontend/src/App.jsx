import { useState } from "react";
import TabelaClientes from "./components/TabelaClientes";
import TabelaProdutos from "./components/TabelaProdutos";
import { ClientesProvider } from "./contexts/ClientesContext";
import CreateClientes from "./components/CreateClientes";

const App = () => {
  const [produtos, setProdutos] = useState([]);

  return (
    <div className="w-screen h-screen flex flex-col bg-blue-100 overflow-hidden">
      {/* Cabeçalho */}
      <header className="flex items-center justify-center p-4 bg-blue-200 shadow">
        <h1 className="text-2xl font-bold font-mono text-center">
          <span>Frontend para o</span> <span className="italic underline">Desafio Backend II</span>
        </h1>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-1 flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Clientes */}
        <section className="flex flex-col flex-1 min-w-0 bg-white border rounded shadow p-4 overflow-hidden">
          <h2 className="text-2xl font-bold text-center mb-4">Clientes</h2>
          <ClientesProvider>
            <CreateClientes />
            <div className="flex-1 overflow-auto">
              <TabelaClientes />
            </div>
          </ClientesProvider>
        </section>

        {/* Produtos */}
        <section className="flex flex-col flex-1 min-w-0 bg-white border rounded shadow p-4 overflow-hidden">
          <h2 className="text-2xl font-bold text-center mb-4">Produtos</h2>
          <div className="flex-1 overflow-auto">
            <TabelaProdutos produtos={produtos} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
