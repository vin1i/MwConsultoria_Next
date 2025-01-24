import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/inputs/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/inputs/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select";
import useToast from "@/hooks/use-toast";
import { NumericFormat } from "react-number-format";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Upload, X } from "lucide-react";
import SortableItem from "@/components/ImageReorder/SortableItem";
import { cn } from "@/lib/utils";
export const CadastroProperty = ({ existingProperty, onSave }) => {
  const { toast } = useToast();

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

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...files],
    }));
  };

  const handleRemoveImage = (imageToDelete) => {
    const imageIndex = previewImages.indexOf(imageToDelete);
    setPreviewImages((prev) => prev.filter((img) => img !== imageToDelete));
    setFormData((prev) => ({
      ...prev,
      imagens: prev.imagens.filter((_, index) => index !== imageIndex),
    }));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = previewImages.findIndex((img) => img === active.id);
    const newIndex = previewImages.findIndex((img) => img === over.id);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onSave(formData);
      toast({
        title: "Success",
        description: "Property saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {existingProperty ? "Edit Property" : "Add New Property"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images Section */}
          <div className="space-y-4">
            <Label>Images</Label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Title</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Property title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco">Address</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
                placeholder="Full address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metrosQuadrados">Area (m²)</Label>
              <Input
                id="metrosQuadrados"
                type="number"
                value={formData.metrosQuadrados}
                onChange={(e) => handleChange("metrosQuadrados", e.target.value)}
                placeholder="Property size in square meters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quartos">Bedrooms</Label>
              <Input
                id="quartos"
                type="number"
                value={formData.quartos}
                onChange={(e) => handleChange("quartos", e.target.value)}
                placeholder="Number of bedrooms"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suites">Suites</Label>
              <Input
                id="suites"
                type="number"
                value={formData.suites}
                onChange={(e) => handleChange("suites", e.target.value)}
                placeholder="Number of suites"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banheiros">Bathrooms</Label>
              <Input
                id="banheiros"
                type="number"
                value={formData.banheiros}
                onChange={(e) => handleChange("banheiros", e.target.value)}
                placeholder="Number of bathrooms"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vagas">Parking Spots</Label>
              <Input
                id="vagas"
                type="number"
                value={formData.vagas}
                onChange={(e) => handleChange("vagas", e.target.value)}
                placeholder="Number of parking spots"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disponibilidade">Availability</Label>
              <Select
                value={formData.disponibilidade}
                onValueChange={(value) => handleChange("disponibilidade", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponível">Available</SelectItem>
                  <SelectItem value="Indisponível">Unavailable</SelectItem>
                  <SelectItem value="Reservado">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Financial Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["valorVenda", "valorLocacao", "vlCondominio", "vlIptu"].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field === "valorVenda" ? "Sale Price" :
                   field === "valorLocacao" ? "Rent Price" :
                   field === "vlCondominio" ? "Condo Fee" : "Property Tax"}
                </Label>
                <NumericFormat
                  id={field}
                  value={formData[field]}
                  onValueChange={(values) => handleChange(field, values.formattedValue)}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="R$ "
                  placeholder="Enter amount"
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
                    "text-sm ring-offset-background file:border-0 file:bg-transparent",
                    "file:text-sm file:font-medium placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Description</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Describe the property"
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
              Add Another Video
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
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : existingProperty ? "Save Changes" : "Add Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};