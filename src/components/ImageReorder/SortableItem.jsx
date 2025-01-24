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
      {...listeners}
      className="relative group cursor-pointer border border-gray-300 rounded-lg shadow-sm overflow-hidden"
    >
      <img
        src={src} // Garante que `src` contém a URL correta
        alt="Imagem do imóvel"
        className="w-full h-32 object-cover group-hover:opacity-90"
      />
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100"
      >
        Remover
      </button>
    </div>
  );
};

export default SortableItem;
