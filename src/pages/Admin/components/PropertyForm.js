import React, { useState, useEffect } from "react";
import { uploadImagesToCloudinary } from "../../../services/CloudinaryService/index";
import { toast, ToastContainer } from "react-toastify";
import Carousel from "../../../components/Carousel/index";
import { NumericFormat } from "react-number-format";
import ImageReorder from "../../../components/ImageReorder/ImageReorder";
import styled from "styled-components";

const FormContainer = styled.form`
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    max-width: 900px;
    padding: 15px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;
const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
  grid-column: span 2;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  background-color: var(--red);
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const CancelButton = styled(Button)`
  background-color: var(--red);

  &:hover {
    background-color: var(--dark-red);
  }
`;

const AddVideoButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const PreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const InputGroupFullWidth = styled(InputGroup)`
  grid-column: span 3;
`;

const TextareaFullWidth = styled(Textarea)`
  grid-column: span 3;
`;

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

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((img) => img !== imageToDelete),
    }));

    // Limpa o campo de arquivo para sincronizar com o estado
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    <>
      <ToastContainer autoClose={3000} position="top-center" />
      <FormContainer onSubmit={handleSubmit}>
        <h2>{existingProperty ? "Editar Imóvel" : "Cadastrar Novo Imóvel"}</h2>
        <FormGrid>
          {/* Imagens */}
          <InputGroupFullWidth>
            <Label>Imagens</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <ImageReorder
              images={previewImages}
              onReorder={(newOrder) => {
                setPreviewImages(newOrder);
                setFormData((prev) => ({
                  ...prev,
                  imagens: newOrder,
                }));
              }}
              onDelete={handleRemoveImage}
            />
          </InputGroupFullWidth>

          {/* Título */}
          <InputGroup>
            <Label>Título</Label>
            <Input
              type="text"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Digite o título do imóvel"
            />
          </InputGroup>

          {/* Endereço */}
          <InputGroup>
            <Label>Endereço</Label>
            <Input
              type="text"
              value={formData.endereco}
              onChange={(e) => handleChange("endereco", e.target.value)}
              required
              placeholder="Digite o endereço completo"
            />
          </InputGroup>

          {/* Características */}
          <InputGroup>
            <Label>Metragem (m²)</Label>
            <Input
              type="number"
              value={formData.metrosQuadrados}
              onChange={(e) => handleChange("metrosQuadrados", e.target.value)}
              placeholder="Tamanho do imóvel em metros quadrados"
            />
          </InputGroup>

          <InputGroup>
            <Label>Quartos</Label>
            <Input
              type="number"
              value={formData.quartos}
              onChange={(e) => handleChange("quartos", e.target.value)}
              placeholder="Quantidade de quartos"
            />
          </InputGroup>

          <InputGroup>
            <Label>Suítes</Label>
            <Input
              type="number"
              value={formData.suites}
              onChange={(e) => handleChange("suites", e.target.value)}
              placeholder="Quantidade de suítes"
            />
          </InputGroup>

          <InputGroup>
            <Label>Banheiros</Label>
            <Input
              type="number"
              value={formData.banheiros}
              onChange={(e) => handleChange("banheiros", e.target.value)}
              placeholder="Quantidade de banheiros"
            />
          </InputGroup>

          <InputGroup>
            <Label>Vagas de Garagem</Label>
            <Input
              type="number"
              value={formData.vagas}
              onChange={(e) => handleChange("vagas", e.target.value)}
              placeholder="Quantidade de vagas de garagem"
            />
          </InputGroup>

          {/* Valores financeiros */}
   {/* Valores financeiros */}
<InputGroup>
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
</InputGroup>

<InputGroup>
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
</InputGroup>

<InputGroup>
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
</InputGroup>

<InputGroup>
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
</InputGroup>


          {/* Disponibilidade */}
          <InputGroup>
            <Label>Disponibilidade</Label>
            <Select
              value={formData.disponibilidade}
              onChange={(e) => handleChange("disponibilidade", e.target.value)}
            >
              <option value="Disponível">Disponível</option>
              <option value="Indisponível">Indisponível</option>
              <option value="Reservado">Reservado</option>
            </Select>
          </InputGroup>

          {/* Descrição */}
          <InputGroupFullWidth>
            <Label>Descrição</Label>
            <TextareaFullWidth
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Descreva o imóvel"
            />
          </InputGroupFullWidth>

          <InputGroup>
            <Label>URLs de Vídeos do YouTube</Label>
            {Array.isArray(formData.videos) &&
              formData.videos.map((video, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Input
                    type="text"
                    value={video}
                    onChange={(e) => handleVideoChange(index, e.target.value)}
                    placeholder="URL do vídeo do YouTube"
                  />
                  {!isValidUrl(video) && video.length > 0 && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      URL inválida
                    </p>
                  )}
                  <Button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            <AddVideoButton type="button" onClick={handleAddVideo}>
              Adicionar outro vídeo
            </AddVideoButton>
          </InputGroup>
        </FormGrid>

        <ButtonGroup>
          <Button type="submit" disabled={isSaving}>
            {isSaving
              ? "Salvando..."
              : existingProperty
              ? "Salvar Alterações"
              : "Cadastrar Imóvel"}
          </Button>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </>
  );
};

export default PropertyForm;
