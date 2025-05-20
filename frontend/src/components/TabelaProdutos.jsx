import React from "react";

const TabelaClientes = ({ produtos }) => {
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
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <tr key={produto.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{produto.id}</td>
              <td className="border border-gray-300 px-4 py-2">{produto.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{produto.descricao}</td>
              <td className="border border-gray-300 px-4 py-2">{produto.preco}</td>
              <td className="border border-gray-300 px-4 py-2">{produto.data_atualizado}</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center justify-evenly ">
                <button>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center border border-gray-300 px-4 py-2 text-gray-500">
              Nenhum produto encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TabelaClientes;
