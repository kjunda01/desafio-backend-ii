const ModalCreate = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay escuro */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Conteúdo do modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Botão de fechar */}
          <button onClick={onClose} className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500 hover:text-gray-700">
            &times;
          </button>

          {/* Conteúdo do modal */}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalCreate;
