import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, src, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative group cursor-pointer border border-gray-300 rounded-lg shadow-sm overflow-hidden"
    >
      {/* Elemento de arrasto - adicionamos os listeners apenas na imagem */}
      <div {...listeners} className="h-full">
        <img
          src={src}
          alt="Imagem do imóvel"
          className="w-full h-32 object-cover group-hover:opacity-90"
        />
      </div>

      {/* Botão de remover com prevenção de propagação de eventos */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // Impede a propagação do evento
          e.preventDefault();  // Previne comportamento padrão
          onRemove(id);
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 
          transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-red-600 active:scale-95 focus:outline-none 
          focus:ring-2 focus:ring-red-600 z-10" // Adicionado z-10 para prioridade
        style={{ touchAction: 'none' }} // Importante para dispositivos touch
      >
        Remover
      </button>
    </div>
  );
};

export default SortableItem;