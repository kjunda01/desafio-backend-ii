import React, { useState } from "react";
import useClientes from "../hooks/useClientes";
import ModalCreate from "./ModalCreate";
import FieldSetCreate from "./form/FieldSetCreate";
import { toast } from "react-toastify";

const CreateClientes = () => {
  const { create, setCliente, cliente, getAll } = useClientes();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (cliente) => {
    try {
      await create(cliente);
      await getAll();
      setIsModalCreateOpen(false);
      toast.success("Cliente criado com sucesso!");
    } catch (error) {
      const erro = error?.response?.data?.error;
      toast.error(erro);
      console.error(erro);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        className="bg-green-600 hover:bg-green-800 text-white p-1 mb-2 rounted rounded-md cursor-pointer"
        onClick={() => {
          setIsModalCreateOpen(true);
        }}
      >
        Adicionar cliente
      </button>

      {isModalCreateOpen && (
        <ModalCreate isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
          <h1 className="flex text-center items-center justify-center text-xl p-1">Informe os dados para criar um cliente</h1>
          <form className="flex flex-col gap-3 justify-center">
            <FieldSetCreate campo="NOME" name="nome" onChange={handleChange} />
            <FieldSetCreate campo="SOBRENOME" name="sobrenome" onChange={handleChange} />
            <FieldSetCreate campo="EMAIL" type="email" name="email" onChange={handleChange} />
            <FieldSetCreate campo="IDADE" type="number" name="idade" onChange={handleChange} />
          </form>
          <div className="flex justify-center w-full">
            <button
              onClick={() => {
                try {
                  handleCreate(cliente);
                  setIsModalCreateOpen(false);
                } catch (error) {
                  const erro = error.response.data?.error?.[0]?.message;
                  toast.error(erro);
                  console.error(erro);
                }
              }}
              className="w-[80%] p-2 text-white bg-green-700 hover:bg-green-900 rounded-md flex items-center justify-center m-2 border  cursor-pointer"
            >
              Criar cliente
            </button>
          </div>
        </ModalCreate>
      )}
    </div>
  );
};

export default CreateClientes;
