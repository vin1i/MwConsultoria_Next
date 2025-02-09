import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { uploadImagesToCloudinary } from "../services/CloudinaryService/index";

const usePropertyForm = (existingProperty, onSave) => {
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
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  // Função para validar URLs
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (existingProperty) {
      const formattedImages = existingProperty.imagens.map((img) => {
        return img.replace(
          /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)+/,
          `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`
        );
      });


      setFormData((prev) => ({
        ...prev,
        ...existingProperty,
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
        imagens: formattedImages,
      }));

      setPreviewImages(formattedImages);
    }
  }, [existingProperty]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type.startsWith("image/") // Garante que são apenas arquivos de imagem
    );

    const newPreviews = files.map((file) => ({
      id: `${file.name}-${Date.now()}`, // ID único para cada imagem
      src: URL.createObjectURL(file), // Gera URL para pré-visualização
      file, // Mantém o arquivo para upload posterior
    }));

    setPreviewImages((prev) => [...prev, ...newPreviews.map((img) => img.src)]);
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...newPreviews], // Adiciona ao estado de imagens
    }));
  };

  const handleRemoveImage = (imageToDelete) => {
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((img) => img !== imageToDelete),
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const parseCurrency = (value) => {
    if (!value) return 0;
    return parseFloat(
      value.replace("R$ ", "").replace(/\./g, "").replace(",", ".")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filtra apenas os arquivos que são instâncias de File
      const newImages = formData.imagens.filter((img) => img instanceof File);

      // Faz upload dos arquivos
      const uploadedImages = await uploadImagesToCloudinary(newImages);

      // Combina as URLs existentes com as novas
      const allImages = [
        ...formData.imagens.filter((img) => typeof img === "string"),
        ...uploadedImages,
      ];

      // Atualiza as pré-visualizações para refletir os uploads bem-sucedidos
      setPreviewImages(allImages);

      const payload = {
        ...formData,
        imagens: allImages, // Atualiza o payload com todas as imagens
      };

      await onSave(payload);
      toast.success("Imóvel salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar imóvel:", error);
      toast.error("Erro ao salvar as imagens. Tente novamente.");
    }
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

  return {
    formData,
    previewImages,
    isSaving,
    setFormData,
    setPreviewImages,
    handleChange,
    handleFileChange,
    handleRemoveImage,
    handleAddVideo,
    handleRemoveVideo,
    handleVideoChange,
    handleSubmit,
    handleCancel,
    fileInputRef,
    isValidUrl, // Agora disponível para uso no componente
  };
};

export default usePropertyForm;
