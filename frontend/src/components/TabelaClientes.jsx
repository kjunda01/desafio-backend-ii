import useClientes from "../hooks/useClientes";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import FieldSetEdit from "./form/FieldSetEdit";
import { toast } from "react-toastify";

const TabelaClientes = () => {
  const { cliente, clientes, setCliente, getAll, update, remove } = useClientes();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

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
      const erro = error.response.data.errors || error.response.data.message;
      toast.error(erro);
      console.error(erro);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
      await getAll();
      setIsModalDeleteOpen(false);
      toast.success("Cliente removido com sucesso!");
    } catch (error) {
      const erro = error.response.data.errors || error.response.data.message;
      toast.error(erro);
      console.error(erro);
    }
  };

  return (
    <>
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
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
                      setCliente(clienteAtual);
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

      {isModalEditOpen && (
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
      )}

      {isModalDeleteOpen && (
        <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)}>
          <form className="flex flex-col gap-3">
            <p className="text-xl flex flex-col text-center">
              Deseja deletar o cliente{" "}
              <span className="text-3xl italic">
                {cliente.nome.toUpperCase()} {cliente.sobrenome.toUpperCase()} ?
              </span>{" "}
            </p>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="p-2 bg-red-500 rounded-md flex items-center justify-center m-2 border hover:bg-red-800 cursor-pointer w-[25%] text-white"
                onClick={(e) => {
                  setIsModalDeleteOpen(false);
                  handleDelete(cliente.id);
                }}
              >
                Deletar
              </button>
              <button
                type="submit"
                className="p-2 text-white bg-green-700 hover:bg-green-900 rounded-md flex items-center justify-center m-2 border  cursor-pointer w-[25%]"
                onClick={(e) => {
                  setIsModalDeleteOpen(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </ModalDelete>
      )}
    </>
  );
};

export default TabelaClientes;
