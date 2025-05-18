const App = () => {
  const clientes = [
    { id: 1, nome: "Teste", email: "teste@teste.com" },
    { id: 2, nome: "Teste2", email: "teste2@teste.com" },
    { id: 3, nome: "Teste3", email: "teste3@teste.com" },
    { id: 4, nome: "Teste4", email: "teste4@teste.com" },
  ];

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-blue-100">
      {/* Parte do título */}
      <div className="flex flex-1 items-center">
        <h1 className="text-2xl font-bold font-mono p-3 border rounded-sm bg-blue-200">
          <span>Frontend para o</span> <span className="italic underline">Desafio Backend II</span>
        </h1>
      </div>

      {/* Parte dos testes */}
      <div className="flex flex-2/3 gap-3 p-3">
        {/* Clientes */}
        <div className="flex flex-col w-full h-fit border rounded-sm items-start justify-center p-3">
          <h2>Clientes</h2>

          <div className="flex flex-col items-center justify-center">
            {/* Icones */}
            <div className="flex gap-3">
              <p>C</p>
              <p>R</p>
              <p>U</p>
              <p>D</p>
            </div>

            <div>
              <p className="mt-3 font-bold">Lista de clientes:</p>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="flex flex-1 w-full h-fit border rounded-sm items-start justify-center p-3">
          <h2>Produtos</h2>
        </div>
      </div>
    </div>
  );
};

export default App;
