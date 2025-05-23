import React, { useState } from "react";
import useProdutos from "../hooks/useProdutos";
import ModalCreate from "./ModalCreate";
import FieldSetCreate from "./form/FieldSetCreate";
import { toast } from "react-toastify";

const CreateProdutos = () => {
  const { create, setProduto, produto, getAll } = useProdutos();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (produto) => {
    try {
      await create(produto);
      await getAll();
      setIsModalCreateOpen(false);
      toast.success("Produto criado com sucesso!");
    } catch (error) {
      const erro = error.response.data.errors || error.response.data.message;
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
          setProduto("");
        }}
      >
        Adicionar produto
      </button>

      {isModalCreateOpen && (
        <ModalCreate isOpen={isModalCreateOpen} onClose={() => setIsModalCreateOpen(false)}>
          <h1 className="flex text-center items-center justify-center text-xl p-1">Informe os dados para criar um produto</h1>
          <form className="flex flex-col gap-3 justify-center">
            <FieldSetCreate campo="NOME" name="nome" onChange={handleChange} />
            <FieldSetCreate campo="DESCRIÇÃO" name="descricao" onChange={handleChange} />
            <FieldSetCreate campo="PREÇO" type="number" name="preco" onChange={handleChange} />
            <FieldSetCreate campo="DATA ATUALIZADO" type="datetime-local" name="data_atualizado" onChange={handleChange} />
          </form>
          <div className="flex justify-center w-full">
            <button
              onClick={() => {
                try {
                  handleCreate(produto);
                  setIsModalCreateOpen(false);
                } catch (error) {
                  const erro = error.response.data?.error?.[0]?.message;
                  toast.error(erro);
                  console.error(erro);
                }
              }}
              className="w-[80%] p-2 text-white bg-green-700 hover:bg-green-900 rounded-md flex items-center justify-center m-2 border  cursor-pointer"
            >
              Criar produto
            </button>
          </div>
        </ModalCreate>
      )}
    </div>
  );
};

export default CreateProdutos;
