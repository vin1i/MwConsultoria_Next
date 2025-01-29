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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";
import { toast, ToastContainer } from "react-toastify";
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

  const normalizeImages = (images) => {
    return images.map((img) => {
      if (typeof img === "string") {
        // Extrai o public_id da URL do Cloudinary
        const publicId = img.split("/").slice(-1)[0].split(".")[0];
        return { id: publicId, src: img };
      }
      return img;
    });
  };

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

      const formattedData = {
        ...existingProperty,
        imagens: normalizeImages(existingProperty.imagens),
      };

      setFormData(formattedData);
      setPreviewImages(formattedData.imagens);
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

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    for (const file of files) {
      const formDataCloudinary = new FormData();
      formDataCloudinary.append("file", file);
      formDataCloudinary.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formDataCloudinary,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erro ${response.status}: Não autorizado. Verifique suas credenciais.`
          );
        }

        const data = await response.json();
        uploadedImages.push({
          id: data.public_id,
          src: data.secure_url,
        });
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
        toast.error("Erro ao fazer upload da imagem");
      }
    }

    setPreviewImages((prev) => [...prev, ...uploadedImages]);
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...uploadedImages],
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

  const handleRemoveImage = async (imageId) => {
    try {
      // Exclui a imagem do Cloudinary
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_id: imageId }),
        }
      );

      // Atualiza o estado corretamente removendo apenas a imagem específica
      setPreviewImages((prev) => prev.filter((img) => img.id !== imageId));
      setFormData((prev) => ({
        ...prev,
        imagens: prev.imagens.filter((img) => img.id !== imageId),
      }));
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
    }
  };

  const parseCurrency = (value) => {
    if (typeof value !== "string") {
      return 0;
    }
    return (
      parseFloat(
        value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
      ) || 0
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

    if (!active || !over || active.id === over.id) return;

    const oldIndex = previewImages.findIndex((img) => img.id === active.id);
    const newIndex = previewImages.findIndex((img) => img.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newItems = arrayMove(previewImages, oldIndex, newIndex);
      setPreviewImages(newItems);
      setFormData((prev) => ({
        ...prev,
        imagens: newItems,
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
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Clique para carregar</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF até 10MB
                  </p>
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
                items={previewImages.map((img) => img.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {previewImages.map((img) => (
                    <SortableItem
                      key={img.id}
                      id={img.id}
                      src={img.src}
                      onRemove={handleRemoveImage}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* <DndContext
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
              </DndContext> */}
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
                onChange={(e) =>
                  handleChange("metrosQuadrados", e.target.value)
                }
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
                onChange={(e) =>
                  handleChange("disponibilidade", e.target.value)
                }
              >
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
                <option value="Reservado">Reservado</option>
              </SelectCustom>
            </InputGroupCustom>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Descreva seu imóvel"
              className="min-h-[150px]"
            />
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
            <ToastContainer />
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving
                ? "Salvando..."
                : existingProperty
                ? "Salvar Alterações"
                : "Cadastrar Propriedade"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const InputGroupCustom = styled.div`
  margin-bottom: 20px;
`;

const LabelCustom = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;
const SelectCustom = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export default PropertyForm;
