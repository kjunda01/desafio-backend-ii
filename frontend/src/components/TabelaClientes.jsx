import useClientes from "../hooks/useClientes";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import FieldSetEdit from "./form/FieldSetEdit";
import { toast } from "react-toastify";

const TabelaClientes = () => {
  const { cliente, clientes, setCliente, setClientes, getAll, getSingle, update, remove } = useClientes();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  useEffect(() => {
    getAll;
  }, []);

  const handleDelete = async (cliente) => {
    try {
      await remove(cliente.id);
      await getAll();
      setIsModalDeleteOpen(false);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (cliente) => {
    try {
      await update(cliente);
      await getAll();
      setIsModalEditOpen(false);
      toast.success("Cliente atualizado com sucesso!");
    } catch (error) {
      const erro = error.response.data?.error?.[0]?.message;
      toast.error(erro);
      console.error(erro);
    }
  };

  const handleCreate = () => {};

  return (
    <>
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
            clientes.map((clienteAtual) => (
              <tr key={clienteAtual.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{clienteAtual.id}</td>
                <td className="border border-gray-300 px-4 py-2">{clienteAtual.nome}</td>
                <td className="border border-gray-300 px-4 py-2">{clienteAtual.sobrenome}</td>
                <td className="border border-gray-300 px-4 py-2">{clienteAtual.email}</td>
                <td className="border border-gray-300 px-4 py-2">{clienteAtual.idade}</td>
                <td className="border border-gray-300 px-4 py-2 flex items-center justify-evenly ">
                  <button
                    onClick={() => {
                      setIsModalEditOpen(true);
                      setCliente(clienteAtual);
                    }}
                    className="cursor-pointer"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      setIsModalDeleteOpen(true);
                      handleDelete(cliente);
                    }}
                    className="cursor-pointer"
                  >
                    🗑️
                  </button>
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

      <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
        <form className="flex flex-col gap-3">
          <p>ID: {cliente.id}</p>

          <FieldSetEdit campo="NOME" name="nome" value={cliente.nome} onChange={handleChange} />
          <FieldSetEdit campo="SOBRENOME" name="sobrenome" value={cliente.sobrenome} onChange={handleChange} />
          <FieldSetEdit campo="EMAIL" type="email" name="email" value={cliente.email} onChange={handleChange} />
          <FieldSetEdit campo="IDADE" type="number" name="idade" value={cliente.idade} onChange={handleChange} />

          <button
            type="button"
            onClick={(e) => {
              setIsModalEditOpen(false);
              handleEdit(cliente);
            }}
            className="p-2 bg-yellow-300 rounded-md flex items-center justify-center m-2 border hover:bg-amber-300 cursor-pointer"
          >
            Atualizar
          </button>
        </form>
      </ModalEdit>
    </>
  );
};

export default TabelaClientes;
