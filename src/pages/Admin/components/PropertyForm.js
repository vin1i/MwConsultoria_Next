// import React, { useState, useEffect } from "react";
// import { uploadImagesToCloudinary } from "../../../services/CloudinaryService/index";
// import {toast,toastContainer } from "react-toastify";

// import { NumericFormat } from "react-number-format";

// import styled from "styled-components";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   KeyboardSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import SortableItem from "@/components/ImageReorder/SortableItem";
// const FormContainer = styled.form`
//   max-width: 1200px;
//   margin: 20px auto;
//   padding: 20px;
//   background-color: #f9f9f9;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

//   @media (max-width: 1024px) {
//     max-width: 900px;
//     padding: 15px;
//   }

//   @media (max-width: 768px) {
//     max-width: 100%;
//     padding: 15px;
//   }
// `;

// const FormGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   gap: 20px;

//   @media (max-width: 1024px) {
//     grid-template-columns: 1fr 1fr;
//   }

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 10px;
//   }
// `;
const InputGroupCustom = styled.div`
  margin-bottom: 20px;
`;

const LabelCustom = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
//   resize: vertical;
//   grid-column: span 2;
// `;

const SelectCustom = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// const FileInput = styled.input`
//   width: 100%;
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   font-size: 16px;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//   @media (min-width: 768px) {
//     flex-direction: row;
//   }
// `;

// const Button = styled.button`
//   flex: 1;
//   padding: 12px;
//   background-color: var(--red);
//   color: #fff;
//   font-size: 16px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: var(--dark-red);
//   }
// `;

// const CancelButton = styled(Button)`
//   background-color: var(--red);

//   &:hover {
//     background-color: var(--dark-red);
//   }
// `;

// const AddVideoButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   font-size: 14px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const PreviewContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 10px;
//   margin-top: 10px;
// `;

// const PreviewImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: cover;
//   border-radius: 4px;
//   border: 1px solid #ddd;

//   @media (max-width: 768px) {
//     width: 60px;
//     height: 60px;
//   }
// `;

// const InputGroupFullWidth = styled(InputGroup)`
//   grid-column: span 3;
// `;

// const TextareaFullWidth = styled(Textarea)`
//   grid-column: span 3;
// `;

// const PropertyForm = ({ existingProperty, onSave }) => {
//   const [formData, setFormData] = useState({
//     tipo: "venda",
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
//     titulo: "",
//     imagens: [],
//     videos: [""],
//     dt_criacao: "",
//   });

//   const [previewImages, setPreviewImages] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (existingProperty) {
//       setFormData((prev) => ({
//         ...prev,
//         valorVenda: existingProperty.valorVenda
//           ? ` ${existingProperty.valorVenda.toLocaleString("pt-BR", {
//               minimumFractionDigits: 2,
//             })}`
//           : "",
//         valorLocacao: existingProperty.valorLocacao
//           ? ` ${existingProperty.valorLocacao.toLocaleString("pt-BR", {
//               minimumFractionDigits: 2,
//             })}`
//           : "",
//         vlCondominio: existingProperty.vlCondominio
//           ? ` ${existingProperty.vlCondominio.toLocaleString("pt-BR", {
//               minimumFractionDigits: 2,
//             })}`
//           : "",
//         vlIptu: existingProperty.vlIptu
//           ? ` ${existingProperty.vlIptu.toLocaleString("pt-BR", {
//               minimumFractionDigits: 2,
//             })}`
//           : "",
//       }));
//     }
//   }, [existingProperty]);


//   const sensors = useSensors(
//       useSensor(PointerSensor),
//       useSensor(KeyboardSensor)
//     );
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const fileInputRef = React.useRef(null);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...newPreviews]);
//     setFormData((prev) => ({
//       ...prev,
//       imagens: [...prev.imagens, ...files],
//     }));
//   };


//   useEffect(() => {
//     if (existingProperty) {
//       const formattedImages = existingProperty.imagens.map((img) => {
//         return img.replace(
//           /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)+/,
//           "https://res.cloudinary.com/dsioklbbq/image/upload/"
//         );
//       });

//       setFormData((prev) => ({
//         ...prev,
//         ...existingProperty,
//         imagens: formattedImages,
//       }));

//       setPreviewImages(formattedImages);
//     }
//   }, [existingProperty]);

//   const isValidUrl = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const handleVideoChange = (index, value) => {
//     const updatedVideos = [...formData.videos];
//     updatedVideos[index] = value;
//     handleChange("videos", updatedVideos);
//   };

//   const handleAddVideo = () => {
//     handleChange("videos", [...formData.videos, ""]);
//   };

//   const handleRemoveVideo = (index) => {
//     const updatedVideos = formData.videos.filter((_, i) => i !== index);
//     handleChange("videos", updatedVideos);
//   };

//   const isValidImageUrl = (url) => {
//     return url.startsWith("http") || url.startsWith("blob:");
//   };

//   const handleRemoveImage = (imageToDelete) => {
//     const imageIndex = previewImages.indexOf(imageToDelete);
//     setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
//     setFormData((prev) => ({
//       ...prev,
//       imagens: prev.imagens.filter((_, index) => index !== imageIndex),
//     }));
//   };


//   const parseCurrency = (value) => {
//     if (!value) return 0;
//     return parseFloat(
//       value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
//     );
//   };

//   const [isSaving, setIsSaving] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newImages = formData.imagens.filter((img) => img instanceof File);
//       const uploadedImages = await uploadImagesToCloudinary(newImages);

//       const allImages = [
//         ...formData.imagens.filter((img) => typeof img === "string"),
//         ...uploadedImages,
//       ];

//       const payload = {
//         ...formData,
//         valorVenda: parseCurrency(formData.valorVenda),
//         valorLocacao: parseCurrency(formData.valorLocacao),
//         vlCondominio: parseCurrency(formData.vlCondominio),
//         vlIptu: parseCurrency(formData.vlIptu),
//         imagens: allImages,
//       };

//       await onSave(payload);

//       previewImages.forEach((url) => {
//         if (url.startsWith("blob:")) {
//           URL.revokeObjectURL(url);
//         }
//       });

//      toast.success("Imóvel salvo com sucesso!");
//     } catch (error) {
//       console.error("Erro ao salvar imóvel:", error);
//      toast.error("Erro ao salvar as imagens. Tente novamente.");
//     }
//   };
// //  const handleDragEnd = (event) => {
// //     const { active, over } = event;
// //     if (active.id !== over.id) {
// //       const oldIndex = previewImages.findIndex((img) => img === active.id);
// //       const newIndex = previewImages.findIndex((img) => img === over.id);
// //       const reorderedPreviews = arrayMove(previewImages, oldIndex, newIndex);
// //       const reorderedFiles = arrayMove(formData.imagens, oldIndex, newIndex);
// //       setPreviewImages(reorderedPreviews);
// //       setFormData((prev) => ({
// //         ...prev,
// //         imagens: reorderedFiles,
// //       }));
// //     }
// //   };
// const handleDragEnd = (event) => {
//   const { active, over } = event;

//   // Verifica se active ou over são nulos
//   if (!active || !over || active.id === over.id) {
//     return;
//   }

//   const oldIndex = previewImages.findIndex((img) => img === active.id);
//   const newIndex = previewImages.findIndex((img) => img === over.id);

//   // Reordena visualizações
//   if (oldIndex !== -1 && newIndex !== -1) {
//     const reorderedPreviews = arrayMove(previewImages, oldIndex, newIndex);
//     const reorderedFiles = arrayMove(formData.imagens, oldIndex, newIndex);

//     setPreviewImages(reorderedPreviews);
//     setFormData((prev) => ({
//       ...prev,
//       imagens: reorderedFiles,
//     }));
//   }
// };

//   const handleDeleteImage = (imageToDelete) => {
//     setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
//     setFormData((prev) => ({
//       ...prev,
//       imagens: prev.imagens.filter((img) => img !== imageToDelete),
//     }));
//   };

//   const handleCancel = () => {
//     setFormData({
//       tipo: "venda",
//       endereco: "",
//       valorVenda: "",
//       valorLocacao: "",
//       vlCondominio: "",
//       vlIptu: "",
//       quartos: "",
//       banheiros: "",
//       vagas: "",
//       suites: "",
//       metrosQuadrados: "",
//       descricao: "",
//       disponibilidade: "Disponível",
//       titulo: "",
//       imagens: [],
//       videos: [""],
//       dt_criacao: "",
//     });
//    toast.info("Edição cancelada.");
//   };

//   return (
//     <>
//       <ToastContainer autoClose={3000} position="top-center" />
//       <FormContainer onSubmit={handleSubmit}>
//         <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>
//         <FormGrid>
//           {/* Imagens */}
//           <div className="space-y-4">
//             <Label>Images</Label>
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                   </svg>
//                   <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   multiple
//                   accept="image/*"
//                   onChange={handleFileChange}
//                 />
//               </label>
//             </div>
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragEnd={handleDragEnd}
//             >
//               <SortableContext
//                 items={previewImages}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {previewImages.map((img) => (
//                     <SortableItem
//                       key={img}
//                       id={img}
//                       src={img}
//                       onRemove={handleRemoveImage}
//                     />
//                   ))}
//                 </div>
//               </SortableContext>
//             </DndContext>
//           </div>

//           {/* Título */}
//           <InputGroup>
//             <Label>Título</Label>
//             <Input
//               type="text"
//               value={formData.titulo}
//               onChange={(e) => handleChange("titulo", e.target.value)}
//               placeholder="Digite o título do imóvel"
//             />
//           </InputGroup>

//           {/* Endereço */}
//           <InputGroup>
//             <Label>Endereço</Label>
//             <Input
//               type="text"
//               value={formData.endereco}
//               onChange={(e) => handleChange("endereco", e.target.value)}
//               required
//               placeholder="Digite o endereço completo"
//             />
//           </InputGroup>

//           {/* Características */}
//           <InputGroup>
//             <Label>Metragem (m²)</Label>
//             <Input
//               type="number"
//               value={formData.metrosQuadrados}
//               onChange={(e) => handleChange("metrosQuadrados", e.target.value)}
//               placeholder="Tamanho do imóvel em metros quadrados"
//             />
//           </InputGroup>

//           <InputGroup>
//             <Label>Quartos</Label>
//             <Input
//               type="number"
//               value={formData.quartos}
//               onChange={(e) => handleChange("quartos", e.target.value)}
//               placeholder="Quantidade de quartos"
//             />
//           </InputGroup>

//           <InputGroup>
//             <Label>Suítes</Label>
//             <Input
//               type="number"
//               value={formData.suites}
//               onChange={(e) => handleChange("suites", e.target.value)}
//               placeholder="Quantidade de suítes"
//             />
//           </InputGroup>

//           <InputGroup>
//             <Label>Banheiros</Label>
//             <Input
//               type="number"
//               value={formData.banheiros}
//               onChange={(e) => handleChange("banheiros", e.target.value)}
//               placeholder="Quantidade de banheiros"
//             />
//           </InputGroup>

//           <InputGroup>
//             <Label>Vagas de Garagem</Label>
//             <Input
//               type="number"
//               value={formData.vagas}
//               onChange={(e) => handleChange("vagas", e.target.value)}
//               placeholder="Quantidade de vagas de garagem"
//             />
//           </InputGroup>

//           {/* Valores financeiros */}
//    {/* Valores financeiros */}
// <InputGroup>
//   <Label>Valor de Venda</Label>
//   <NumericFormat
//     value={formData.valorVenda}
//     onValueChange={(values) =>
//       handleChange("valorVenda", values.formattedValue)
//     }
//     thousandSeparator="."
//     decimalSeparator=","
//     prefix="R$ "
//     placeholder="Preço para venda do imóvel"
//     customInput={Input}
//   />
//   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
//     Digite apenas números. O campo será formatado automaticamente.
//   </p>
// </InputGroup>

// <InputGroup>
//   <Label>Valor de Locação</Label>
//   <NumericFormat
//     value={formData.valorLocacao}
//     onValueChange={(values) =>
//       handleChange("valorLocacao", values.formattedValue)
//     }
//     thousandSeparator="."
//     decimalSeparator=","
//     prefix="R$ "
//     placeholder="Preço para locação do imóvel"
//     customInput={Input}
//   />
//   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
//     Digite apenas números. O campo será formatado automaticamente.
//   </p>
// </InputGroup>

// <InputGroup>
//   <Label>Valor do Condomínio</Label>
//   <NumericFormat
//     value={formData.vlCondominio}
//     onValueChange={(values) =>
//       handleChange("vlCondominio", values.formattedValue)
//     }
//     thousandSeparator="."
//     decimalSeparator=","
//     prefix="R$ "
//     placeholder="Preço do condomínio do imóvel"
//     customInput={Input}
//   />
//   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
//     Digite apenas números. O campo será formatado automaticamente.
//   </p>
// </InputGroup>

// <InputGroup>
//   <Label>Valor do IPTU</Label>
//   <NumericFormat
//     value={formData.vlIptu}
//     onValueChange={(values) =>
//       handleChange("vlIptu", values.formattedValue)
//     }
//     thousandSeparator="."
//     decimalSeparator=","
//     prefix="R$ "
//     placeholder="Preço do IPTU do imóvel"
//     customInput={Input}
//   />
//   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
//     Digite apenas números. O campo será formatado automaticamente.
//   </p>
// </InputGroup>


//           {/* Disponibilidade */}
//           <InputGroup>
//             <Label>Disponibilidade</Label>
//             <Select
//               value={formData.disponibilidade}
//               onChange={(e) => handleChange("disponibilidade", e.target.value)}
//             >
//               <option value="Disponível">Disponível</option>
//               <option value="Indisponível">Indisponível</option>
//               <option value="Reservado">Reservado</option>
//             </Select>
//           </InputGroup>

//           {/* Descrição */}
//           <InputGroupFullWidth>
//             <Label>Descrição</Label>
//             <TextareaFullWidth
//               value={formData.descricao}
//               onChange={(e) => handleChange("descricao", e.target.value)}
//               placeholder="Descreva o imóvel"
//             />
//           </InputGroupFullWidth>

//           <InputGroup>
//             <Label>URLs de Vídeos do YouTube</Label>
//             {Array.isArray(formData.videos) &&
//               formData.videos.map((video, index) => (
//                 <div
//                   key={index}
//                   style={{ display: "flex", alignItems: "center", gap: "10px" }}
//                 >
//                   <Input
//                     type="text"
//                     value={video}
//                     onChange={(e) => handleVideoChange(index, e.target.value)}
//                     placeholder="URL do vídeo do YouTube"
//                   />
//                   {!isValidUrl(video) && video.length > 0 && (
//                     <p style={{ color: "red", fontSize: "12px" }}>
//                       URL inválida
//                     </p>
//                   )}
//                   <Button
//                     type="button"
//                     onClick={() => handleRemoveVideo(index)}
//                   >
//                     Remover
//                   </Button>
//                 </div>
//               ))}
//             <AddVideoButton type="button" onClick={handleAddVideo}>
//               Adicionar outro vídeo
//             </AddVideoButton>
//           </InputGroup>
//         </FormGrid>

//         <ButtonGroup>
//           <Button type="submit" disabled={isSaving}>
//             {isSaving
//               ? "Salvando..."
//               : existingProperty
//               ? "Salvar Alterações"
//               : "Cadastrar Imóvel"}
//           </Button>
//           <CancelButton type="button" onClick={handleCancel}>
//             Cancelar
//           </CancelButton>
//         </ButtonGroup>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </FormContainer>
//     </>
//   );
// };

// export default PropertyForm;
import React, { useState, useEffect } from "react";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService/index";
import styled from "styled-components";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/inputs/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/inputs/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import {toast,useToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";


const PropertyForm = ({ existingProperty, onSave }) => {
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
    imagens: [],
    videos: [""],
    dt_criacao: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingProperty) {
      setFormData((prev) => ({
        ...prev,
        valorVenda: existingProperty.valorVenda
          ? ` ${existingProperty.valorVenda.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
          : "",
        valorLocacao: existingProperty.valorLocacao
          ? ` ${existingProperty.valorLocacao.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
          : "",
        vlCondominio: existingProperty.vlCondominio
          ? ` ${existingProperty.vlCondominio.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
          : "",
        vlIptu: existingProperty.vlIptu
          ? ` ${existingProperty.vlIptu.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`
          : "",
      }));
    }
  }, [existingProperty]);


  const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor)
    );
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...files],
    }));
  };


  useEffect(() => {
    if (existingProperty) {
      const formattedImages = existingProperty.imagens.map((img) => {
        return img.replace(
          /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)+/,
          "https://res.cloudinary.com/dsioklbbq/image/upload/"
        );
      });

      setFormData((prev) => ({
        ...prev,
        ...existingProperty,
        imagens: formattedImages,
      }));

      setPreviewImages(formattedImages);
    }
  }, [existingProperty]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleVideoChange = (index, value) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index] = value;
    handleChange("videos", updatedVideos);
  };

  const handleAddVideo = () => {
    handleChange("videos", [...formData.videos, ""]);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = formData.videos.filter((_, i) => i !== index);
    handleChange("videos", updatedVideos);
  };

  const isValidImageUrl = (url) => {
    return url.startsWith("http") || url.startsWith("blob:");
  };

  const handleRemoveImage = (imageToDelete) => {
    const imageIndex = previewImages.indexOf(imageToDelete);
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((_, index) => index !== imageIndex),
    }));
  };


  const parseCurrency = (value) => {
    if (!value) return 0;
    return parseFloat(
      value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
    );
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newImages = formData.imagens.filter((img) => img instanceof File);
      const uploadedImages = await uploadImagesToCloudinary(newImages);

      const allImages = [
        ...formData.imagens.filter((img) => typeof img === "string"),
        ...uploadedImages,
      ];

      const payload = {
        ...formData,
        valorVenda: parseCurrency(formData.valorVenda),
        valorLocacao: parseCurrency(formData.valorLocacao),
        vlCondominio: parseCurrency(formData.vlCondominio),
        vlIptu: parseCurrency(formData.vlIptu),
        imagens: allImages,
      };

      await onSave(payload);

      previewImages.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });

     toast.success("Imóvel salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
     toast.error("Erro ao salvar as imagens. Tente novamente.");
    }
  };

const handleDragEnd = (event) => {
  const { active, over } = event;

  // Verifica se active ou over são nulos
  if (!active || !over || active.id === over.id) {
    return;
  }

  const oldIndex = previewImages.findIndex((img) => img === active.id);
  const newIndex = previewImages.findIndex((img) => img === over.id);

  // Reordena visualizações
  if (oldIndex !== -1 && newIndex !== -1) {
    const reorderedPreviews = arrayMove(previewImages, oldIndex, newIndex);
    const reorderedFiles = arrayMove(formData.imagens, oldIndex, newIndex);

    setPreviewImages(reorderedPreviews);
    setFormData((prev) => ({
      ...prev,
      imagens: reorderedFiles,
    }));
  }
};

  const handleDeleteImage = (imageToDelete) => {
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((img) => img !== imageToDelete),
    }));
  };

  const handleCancel = () => {
    setFormData({
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
      imagens: [],
      videos: [""],
      dt_criacao: "",
    });
   toast.info("Edição cancelada.");
  };

 
 
    return (
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {existingProperty ? "Editar Imóvel" : "Adicionar Novo Imóvel"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção de Imagens */}
            <div className="space-y-4">
              <Label>Imagens</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para carregar</span> ou arraste e solte</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
  
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={previewImages}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleChange("titulo", e.target.value)}
                  placeholder="Título do imóvel"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleChange("endereco", e.target.value)}
                  placeholder="Endereço completo"
                  required
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="metrosQuadrados">Área (m²)</Label>
                <Input
                  id="metrosQuadrados"
                  type="number"
                  value={formData.metrosQuadrados}
                  onChange={(e) => handleChange("metrosQuadrados", e.target.value)}
                  placeholder="Tamanho do imóvel em metros quadrados"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="quartos">Quartos</Label>
                <Input
                  id="quartos"
                  type="number"
                  value={formData.quartos}
                  onChange={(e) => handleChange("quartos", e.target.value)}
                  placeholder="Número de quartos"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="suites">Suítes</Label>
                <Input
                  id="suites"
                  type="number"
                  value={formData.suites}
                  onChange={(e) => handleChange("suites", e.target.value)}
                  placeholder="Número de suítes"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="banheiros">Banheiros</Label>
                <Input
                  id="banheiros"
                  type="number"
                  value={formData.banheiros}
                  onChange={(e) => handleChange("banheiros", e.target.value)}
                  placeholder="Número de banheiros"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="vagas">Vagas</Label>
                <Input
                  id="vagas"
                  type="number"
                  value={formData.vagas}
                  onChange={(e) => handleChange("vagas", e.target.value)}
                  placeholder="Número de vagas de estacionamento"
                />
              </div>
              {/* /    {/* Valores financeiros */}
 <InputGroupCustom>
   <Label>Valor de Venda</Label>
   <NumericFormat
     value={formData.valorVenda}
     onValueChange={(values) =>
       handleChange("valorVenda", values.formattedValue)
     }
     thousandSeparator="."
     decimalSeparator=","
     prefix="R$ "
     placeholder="Preço para venda do imóvel"
     customInput={Input}
   />
   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
     Digite apenas números. O campo será formatado automaticamente.
   </p>
 </InputGroupCustom>

 <InputGroupCustom>
   <Label>Valor de Locação</Label>
   <NumericFormat
     value={formData.valorLocacao}
     onValueChange={(values) =>
       handleChange("valorLocacao", values.formattedValue)
     }
     thousandSeparator="."
     decimalSeparator=","
     prefix="R$ "
     placeholder="Preço para locação do imóvel"
     customInput={Input}
   />
   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
     Digite apenas números. O campo será formatado automaticamente.
   </p>
 </InputGroupCustom>

 <InputGroupCustom>
   <Label>Valor do Condomínio</Label>
   <NumericFormat
     value={formData.vlCondominio}
     onValueChange={(values) =>
       handleChange("vlCondominio", values.formattedValue)
     }
     thousandSeparator="."
     decimalSeparator=","
     prefix="R$ "
     placeholder="Preço do condomínio do imóvel"
     customInput={Input}
   />
   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
     Digite apenas números. O campo será formatado automaticamente.
   </p>
 </InputGroupCustom>

 <InputGroupCustom>
   <Label>Valor do IPTU</Label>
   <NumericFormat
     value={formData.vlIptu}
     onValueChange={(values) =>
       handleChange("vlIptu", values.formattedValue)
     }
     thousandSeparator="."
     decimalSeparator=","
     prefix="R$ "
     placeholder="Preço do IPTU do imóvel"
     customInput={Input}
   />
   <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
     Digite apenas números. O campo será formatado automaticamente.
   </p>
 </InputGroupCustom> 
              <InputGroupCustom>
             <Label>Disponibilidade</Label>
             <SelectCustom
               value={formData.disponibilidade}
               onChange={(e) => handleChange("disponibilidade", e.target.value)}
             >
               <option value="Disponível">Disponível</option>
               <option value="Indisponível">Indisponível</option>
               <option value="Reservado">Reservado</option>
             </SelectCustom>
           </InputGroupCustom>

            </div>

          {/* Videos */}
          <div className="space-y-4">
            <Label>YouTube Videos</Label>
            {formData.videos.map((video, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={video}
                  onChange={(e) => handleVideoChange(index, e.target.value)}
                  placeholder="YouTube video URL"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveVideo(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddVideo}
              className="w-full"
            >
             Adicione outro vídeo
            </Button>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
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
                  imagens: [],
                  videos: [""],
                  dt_criacao: "",
                });
               toast({
                  title: "Form Cleared",
                  description: "All fields have been reset",
                });
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : existingProperty ? "Save Changes" : "Cadastrar Propriedade"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
