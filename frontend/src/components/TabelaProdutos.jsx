import useProdutos from "../hooks/useProdutos";
import { useEffect } from "react";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import FieldSetEdit from "./form/FieldSetEdit";
import { toast } from "react-toastify";

const TabelaProdutos = () => {
  const { produto, produtos, setProduto, getAll, update, remove } = useProdutos();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async (produto) => {
    try {
      await update(produto);
      await getAll();
      setIsModalEditOpen(false);
      toast.success("Produto atualizado com sucesso!");
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
      toast.success("Produto removido com sucesso!");
    } catch (error) {
      const erro = error.response.data.errors || error.response.data.message;
      toast.error(erro);
      console.error(erro);
    }
  };

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset(); // Ajuste para seu fuso local
    const localDate = new Date(date.getTime() - offset * 60000); // Converte para horário local
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"
  };

  return (
    <>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Descrição</th>
            <th className="border border-gray-300 px-4 py-2">Preço</th>
            <th className="border border-gray-300 px-4 py-2">Data Atualizado</th>
            <th className="border border-gray-300 px-4 py-2">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length > 0 ? (
            produtos.map((produtoAtual) => (
              <tr key={produtoAtual.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{produtoAtual.id}</td>
                <td className="border border-gray-300 px-4 py-2">{produtoAtual.nome}</td>
                <td className="border border-gray-300 px-4 py-2">{produtoAtual.descricao}</td>
                <td className="border border-gray-300 px-4 py-2">{produtoAtual.preco}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(produtoAtual.data_atualizado).toLocaleDateString("pt-BR")}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex items-center justify-evenly ">
                  <button
                    onClick={() => {
                      setIsModalEditOpen(true);
                      setProduto(produtoAtual);
                    }}
                    className="cursor-pointer"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      setIsModalDeleteOpen(true);
                      setProduto(produtoAtual);
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
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalEditOpen && (
        <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)}>
          <form className="flex flex-col gap-3">
            <p>ID: {produto.id}</p>

            <FieldSetEdit campo="NOME" name="nome" value={produto.nome} onChange={handleChange} />
            <FieldSetEdit campo="DESCRIÇÃO" name="descricao" value={produto.descricao} onChange={handleChange} />
            <FieldSetEdit campo="PREÇO" type="number" name="preco" value={produto.preco} onChange={handleChange} />
            <FieldSetEdit
              campo="DATA ATUALIZADO"
              type="datetime-local"
              name="data_atualizado"
              value={formatDateTimeLocal(produto.data_atualizado)}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={(e) => {
                setIsModalEditOpen(false);
                handleEdit(produto);
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
              Deseja deletar o produto{" "}
              <span className="text-3xl italic">
                {produto.nome.toUpperCase()} {produto.sobrenome.toUpperCase()} ?
              </span>{" "}
            </p>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="p-2 bg-red-500 rounded-md flex items-center justify-center m-2 border hover:bg-red-800 cursor-pointer w-[25%] text-white"
                onClick={(e) => {
                  setIsModalDeleteOpen(false);
                  handleDelete(produto.id);
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

export default TabelaProdutos;
