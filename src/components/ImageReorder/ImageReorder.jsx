// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const ImageReorder = ({ images, setImages }) => {
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;

//     const reorderedImages = Array.from(images);
//     const [removed] = reorderedImages.splice(result.source.index, 1);
//     reorderedImages.splice(result.destination.index, 0, removed);

//     setImages(reorderedImages);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="image-list" direction="horizontal">
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={{ display: "flex", gap: "10px" }}
//           >
//             {images.map((image, index) => (
//               <Draggable key={image.url} draggableId={image.url} index={index}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={{
//                       ...provided.draggableProps.style,
//                       cursor: "grab",
//                       border: "1px solid #ccc",
//                       padding: "5px",
//                       borderRadius: "5px",
//                     }}
//                   >
//                     <img
//                       src={image.url}
//                       alt={`Preview ${index}`}
//                       style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                     />
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default ImageReorder;


import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Componente para cada imagem
import { Button } from "@/components/ui/button";

const Index = () => {
  const [form, setForm] = useState({
    titulo: "",
    imagens: [], // URLs das imagens
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Configuração dos sensores de drag-and-drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setForm((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...newImages],
    }));
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = form.imagens.findIndex((img) => img === active.id);
      const newIndex = form.imagens.findIndex((img) => img === over.id);

      setForm((prev) => ({
        ...prev,
        imagens: arrayMove(prev.imagens, oldIndex, newIndex),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert("Formulário enviado com sucesso!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/90 shadow-lg border-0 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Cadastro de Imóvel</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              value={form.titulo}
              onChange={handleInputChange}
              placeholder="Ex: Apartamento moderno no centro"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="imagens" className="block text-sm font-medium text-gray-700">
              Imagens
            </label>
            <input
              id="imagens"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer block w-full"
            />
            <p className="text-sm text-gray-500">Arraste para reordenar as imagens.</p>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={form.imagens}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {form.imagens.map((img) => (
                    <SortableItem key={img} id={img} src={img} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:scale-[1.02]"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar Imóvel"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
