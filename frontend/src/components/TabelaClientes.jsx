import React from "react";

const TabelaClientes = ({ clientes }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Nome</th>
          <th className="border border-gray-300 px-4 py-2">Sobrenome</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Idade</th>
          <th className="border border-gray-300 px-4 py-2">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {clientes.length > 0 ? (
          clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{cliente.id}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.sobrenome}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.email}</td>
              <td className="border border-gray-300 px-4 py-2">{cliente.idade}</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center justify-evenly ">
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center border border-gray-300 px-4 py-2 text-gray-500">
              Nenhum cliente encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TabelaClientes;
