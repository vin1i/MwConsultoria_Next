// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   PointerSensor,
//   KeyboardSensor
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/services/firebase/firebaseConfig"; // Configuração do Firebase
// import SortableItem from "@/components/ImageReorder/SortableItem";
// import { uploadImagesToCloudinary } from "@/services/CloudinaryService/index"; // Importa o upload do Cloudinary

// const CadastroImovel = () => {
//   const [form, setForm] = useState({
//     titulo: "",
//     tipo: "",
//     endereco: "",
//     valorVenda: "",
//     valorLocacao: "",
//     vlCondominio: "",
//     vlIptu: "",
//     quartos: "",
//     banheiros: "",
//     vagas: "",
//     suites: "",
//     metrosQuadrados: "",
//     descricao: "",
//     disponibilidade: "Disponível",
//     imagens: [],
//   });
//   const [loading, setLoading] = useState(false);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor)
//   );

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e) => {
//     const files = Array.from(e.target.files);

//     try {
//       const uploadedUrls = await uploadImagesToCloudinary(files);
//       console.log("URLs das imagens:", uploadedUrls);

//       setForm((prev) => ({
//         ...prev,
//         imagens: [...prev.imagens, ...uploadedUrls],
//       }));
//     } catch (error) {
//       console.error("Erro ao fazer upload das imagens:", error);
//       alert("Erro ao fazer upload das imagens. Tente novamente.");
//     }
//   };
//   const [isSaving, setIsSaving] = useState(false);
//   const handleRemoveImage = (id) => {
//     setForm((prev) => ({
//       ...prev,
//       imagens: prev.imagens.filter((img) => img !== id),
//     }));
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = form.imagens.findIndex((img) => img === active.id);
//       const newIndex = form.imagens.findIndex((img) => img === over.id);
//       setForm((prev) => ({
//         ...prev,
//         imagens: arrayMove(prev.imagens, oldIndex, newIndex),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const imoveisRef = collection(db, "imoveis");
//       await addDoc(imoveisRef, form);
//       alert("Imóvel cadastrado com sucesso!");
//       setForm({
//         titulo: "",
//         tipo: "",
//         endereco: "",
//         valorVenda: "",
//         valorLocacao: "",
//         vlCondominio: "",
//         vlIptu: "",
//         quartos: "",
//         banheiros: "",
//         vagas: "",
//         suites: "",
//         metrosQuadrados: "",
//         descricao: "",
//         disponibilidade: "Disponível",
//         imagens: [],
//       });
//     } catch (error) {
//       console.error("Erro ao cadastrar imóvel:", error);
//       alert("Erro ao cadastrar imóvel.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/90 shadow-lg border-0 rounded-lg p-6">
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-center">Cadastro de Imóvel</h2>
//           <p className="text-center text-gray-500">Preencha os dados do imóvel abaixo</p>
//         </div>
        // <form onSubmit={handleSubmit} className="space-y-6">
        //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //     <div className="space-y-2">
        //       <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
        //         Título
        //       </label>
        //       <input
        //         id="titulo"
        //         name="titulo"
        //         value={form.titulo}
        //         onChange={handleInputChange}
        //         placeholder="Ex: Apartamento moderno no centro"
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
         
        //     <div className="space-y-2">
        //       <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
        //         Endereço
        //       </label>
        //       <input
        //         id="endereco"
        //         name="endereco"
        //         value={form.endereco}
        //         onChange={handleInputChange}
        //         placeholder="Endereço completo"
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="valorVenda" className="block text-sm font-medium text-gray-700">
        //         Valor de Venda
        //       </label>
        //       <input
        //         id="valorVenda"
        //         name="valorVenda"
        //         type="number"
        //         value={form.valorVenda}
        //         onChange={handleInputChange}
        //         placeholder="R$ 0,00"
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="valorLocacao" className="block text-sm font-medium text-gray-700">
        //         Valor de Locação
        //       </label>
        //       <input
        //         id="valorLocacao"
        //         name="valorLocacao"
        //         type="number"
        //         value={form.valorLocacao}
        //         onChange={handleInputChange}
        //         placeholder="R$ 0,00"
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="vlCondominio" className="block text-sm font-medium text-gray-700">
        //         Condomínio
        //       </label>
        //       <input
        //         id="vlCondominio"
        //         name="vlCondominio"
        //         type="number"
        //         value={form.vlCondominio}
        //         onChange={handleInputChange}
        //         placeholder="R$ 0,00"
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="vlIptu" className="block text-sm font-medium text-gray-700">
        //         IPTU
        //       </label>
        //       <input
        //         id="vlIptu"
        //         name="vlIptu"
        //         type="number"
        //         value={form.vlIptu}
        //         onChange={handleInputChange}
        //         placeholder="R$ 0,00"
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="quartos" className="block text-sm font-medium text-gray-700">
        //         Quartos
        //       </label>
        //       <input
        //         id="quartos"
        //         name="quartos"
        //         type="number"
        //         value={form.quartos}
        //         onChange={handleInputChange}
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="banheiros" className="block text-sm font-medium text-gray-700">
        //         Banheiros
        //       </label>
        //       <input
        //         id="banheiros"
        //         name="banheiros"
        //         type="number"
        //         value={form.banheiros}
        //         onChange={handleInputChange}
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="vagas" className="block text-sm font-medium text-gray-700">
        //         Vagas
        //       </label>
        //       <input
        //         id="vagas"
        //         name="vagas"
        //         type="number"
        //         value={form.vagas}
        //         onChange={handleInputChange}
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="suites" className="block text-sm font-medium text-gray-700">
        //         Suítes
        //       </label>
        //       <input
        //         id="suites"
        //         name="suites"
        //         type="number"
        //         value={form.suites}
        //         onChange={handleInputChange}
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //     <div className="space-y-2">
        //       <label htmlFor="metrosQuadrados" className="block text-sm font-medium text-gray-700">
        //         Metros Quadrados
        //       </label>
        //       <input
        //         id="metrosQuadrados"
        //         name="metrosQuadrados"
        //         type="number"
        //         value={form.metrosQuadrados}
        //         onChange={handleInputChange}
        //        
        //         className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        //       />
        //     </div>
        //   </div>

        //   <div className="space-y-2">
        //     <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
        //       Descrição
        //     </label>
        //     <textarea
        //       id="descricao"
        //       name="descricao"
        //       value={form.descricao}
        //       onChange={handleInputChange}
        //       placeholder="Descreva o imóvel detalhadamente"
        //      
        //       className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary min-h-[100px]"
        //     />
        //   </div>
        //   <p className="text-sm text-gray-500">Arraste para reordenar as imagens.</p>
        //     <DndContext
        //       sensors={sensors}
        //       collisionDetection={closestCenter}
        //       onDragEnd={handleDragEnd}
        //     >
        //       <SortableContext
        //         items={form.imagens}
        //         strategy={verticalListSortingStrategy}
        //       >
        //        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        //     {form.imagens.map((img) => (
        //       <SortableItem
        //         key={img}
        //         id={img}
        //         src={img}
        //         onRemove={handleRemoveImage}
        //       />
        //     ))}
        //   </div>
        //       </SortableContext>
        //     </DndContext>
        //   <div className="space-y-2">
        //     <label htmlFor="imagens" className="block text-sm font-medium text-gray-700">
        //       Imagens
        //     </label>
        //     <input
        //       id="imagens"
        //       type="file"
        //       multiple
        //       accept="image/*"
        //       onChange={handleImageUpload}
        //       className="cursor-pointer block w-full"
        //     />
        //     <p className="text-sm text-gray-500">Selecione uma ou mais imagens do imóvel</p>
        //   </div>

        //   <button type="submit" disabled={isSaving}>
        //     {isSaving
        //       ? "Salvando..."
        //       : existingProperty
        //       ? "Salvar Alterações"
        //       : "Cadastrar Imóvel"}
        //   </button>
        // </form>
//       </div>
//     </div>
//   );
// };

// export default CadastroImovel;
import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadImagesToCloudinary } from "@/services/cloudinaryService";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "@/components/ImageReorder/SortableItem";

const CadastroImovel = ({ onSave }) => {
  const [formData, setFormData] = useState({
    tipo: "venda",
    endereco: "",
    valorVenda: "",
    valorLocacao: "",
    vlCondominio: "",
    vlIptu: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    suites: "",
    metrosQuadrados: "",
    descricao: "",
    disponibilidade: "Disponível",
    titulo: "",
    imagens: [], // Arquivos para envio
  });
  const [previewImages, setPreviewImages] = useState([]); // URLs para exibição
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Gera pré-visualizações para exibição
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...files], // Adiciona os arquivos
    }));
  };

  const handleRemoveImage = (imageToDelete) => {
    const imageIndex = previewImages.indexOf(imageToDelete);

    // Remove a imagem da visualização e dos arquivos
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((_, index) => index !== imageIndex),
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = previewImages.findIndex((img) => img === active.id);
      const newIndex = previewImages.findIndex((img) => img === over.id);

      // Reordena visualizações
      const reorderedPreviews = arrayMove(previewImages, oldIndex, newIndex);

      // Reordena arquivos correspondentes
      const reorderedFiles = arrayMove(formData.imagens, oldIndex, newIndex);

      setPreviewImages(reorderedPreviews);
      setFormData((prev) => ({
        ...prev,
        imagens: reorderedFiles,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Faz upload das imagens (envia os arquivos originais)
      const uploadedImages = await uploadImagesToCloudinary(formData.imagens);

      // Atualiza o payload com as URLs das imagens enviadas
      const payload = {
        ...formData,
        imagens: uploadedImages,
      };

      await onSave(payload);
      toast.success("Imóvel cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      toast.error("Erro ao cadastrar imóvel. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                value={formData.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Ex: Apartamento moderno no centro"
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
         
            <div className="space-y-2">
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                id="endereco"
                name="endereco"
                value={formData.endereco}
            onChange={(e) => handleChange("endereco", e.target.value)}
                placeholder="Endereço completo"
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valorVenda" className="block text-sm font-medium text-gray-700">
                Valor de Venda
              </label>
              <input
                id="valorVenda"
                name="valorVenda"
                type="number"
                value={formData.valorVenda}
            onChange={(e) => handleChange("valorVenda", e.target.value)}
                placeholder="R$ 0,00"
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="valorLocacao" className="block text-sm font-medium text-gray-700">
                Valor de Locação
              </label>
              <input
                id="valorLocacao"
                name="valorLocacao"
                type="number"
                value={formData.valorLocacao}
                onChange={(e) => handleChange("valorLocacao", e.target.value)}
                placeholder="R$ 0,00"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="vlCondominio" className="block text-sm font-medium text-gray-700">
                Condomínio
              </label>
              <input
                id="vlCondominio"
                name="vlCondominio"
                type="number"
                value={formData.vlCondominio}
            onChange={(e) => handleChange("vlCondominio", e.target.value)}
                placeholder="R$ 0,00"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="vlIptu" className="block text-sm font-medium text-gray-700">
                IPTU
              </label>
              <input
                id="vlIptu"
                name="vlIptu"
                type="number"
                value={formData.vlIptu}
                onChange={(e) => handleChange("vlIptu}", e.target.value)}
                placeholder="R$ 0,00"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="quartos" className="block text-sm font-medium text-gray-700">
                Quartos
              </label>
              <input
                id="quartos"
                name="quartos"
                type="number"
                value={formData.quartos}
            onChange={(e) => handleChange("quartos", e.target.value)}
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="banheiros" className="block text-sm font-medium text-gray-700">
                Banheiros
              </label>
              <input
                id="banheiros"
                name="banheiros"
                type="number"
                value={formData.banheiros}
            onChange={(e) => handleChange("banheiros}", e.target.value)}
              
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="vagas" className="block text-sm font-medium text-gray-700">
                Vagas
              </label>
              <input
                id="vagas"
                name="vagas"
                type="number"
                value={formData.vagas}
                onChange={(e) => handleChange("vagas", e.target.value)}
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="suites" className="block text-sm font-medium text-gray-700">
                Suítes
              </label>
              <input
                id="suites"
                name="suites"
                type="number"
                value={formData.suites}
            onChange={(e) => handleChange("suites", e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="metrosQuadrados" className="block text-sm font-medium text-gray-700">
                Metros Quadrados
              </label>
              <input
                id="metrosQuadrados"
                name="metrosQuadrados"
                type="number"
                value={formData.metrosQuadrados}
            onChange={(e) => handleChange("metrosQuadrados}", e.target.value)}
               
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
            onChange={(e) => handleChange("descricao}", e.target.value)}
              placeholder="Descreva o imóvel detalhadamente"
             
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary min-h-[100px]"
            />
          </div>
         <div>
        <label htmlFor="imagens">Imagens</label>
        <input
          type="file"
          id="imagens"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
   <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={previewImages} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((img) => (
                <SortableItem
                  key={img}
                  id={img}
                  src={img}
                  onRemove={handleRemoveImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
};

export default CadastroImovel;
