import React from "react";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Car, Maximize2, Star } from "lucide-react";
import PropertyImageCarousel from "@/components/ui/PropertyImageCarousel";
import { useRouter } from "next/router";
import { useLoading } from "@/context/LoadingContext";
import { ShareButtonCard } from "../ShareButton/ShareButtonCard";

interface RealEstateCardProps {
  id: string;
  endereco: string;
  tipo: string;
  valorVenda: number;
  valorLocacao: number;
  vlCondominio: number;
  vlIptu: number;
  imagens: string[];
  videos: string[];
  titulo: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  metrosQuadrados: number;
  suites: number;
  descricao: string;
  cloudinaryBaseUrl: string;
  disponibilidade: "Disponível" | "Reservado" | "Indisponível";
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  id,
  endereco,
  valorVenda,
  valorLocacao,
  vlCondominio,
  vlIptu,
  imagens,
  videos,
  titulo,
  quartos,
  banheiros,
  vagas,
  metrosQuadrados,
  suites,
  descricao,
  disponibilidade,
}) => {
  const router = useRouter();
  const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;

  const media = [
    ...(imagens || []).map((img) => ({
      src: img.startsWith('http') ? img : `${cloudinaryBaseUrl}${img}`,
      type: "image" as "image",
    })),
  ];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Disponível":
        return "bg-emerald-500";
      case "Reservado":
        return "bg-gray-500";
      case "Indisponível":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const { setIsLoading } = useLoading();

   const handleClick = () => {
    setIsLoading(true); // Ativa o carregamento ao clicar
    router.push(`/imoveis/${id}`).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }; 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative w-full max-w-[400px] overflow-hidden rounded-lg bg-RealEstateCard shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative">
        <PropertyImageCarousel media={media} />
        <span
          className={`absolute left-4 top-4 z-30 rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor(disponibilidade)}`}
        >
          {disponibilidade}
        </span>
      </div>

      <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col min-h-[400px]">
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-primary">{titulo}</h3>
          <div className="mt-2 flex items-start text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4 text-[#9C192B]" />
            {endereco}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-gray-600 text-[#9C192B]" />
              <span>{metrosQuadrados} m²</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-gray-600 text-[#9C192B]" />
              <span>{quartos} Quartos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-gray-600 text-[#9C192B]" />
              <span>{suites} Suítes</span>
            </div>
            <div className="flex items-center gap-2 ">
              <Bath className="h-4 w-4 text-gray-600 text-[#9C192B]" />
              <span>{banheiros} Banheiros</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-gray-600 text-[#9C192B]" />
              <span>{vagas} Vagas</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4 flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Valor</span>
            <span className="text-lg font-semibold text-primary">
              {formatCurrency(valorVenda)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Condomínio</span>
            <span>{formatCurrency(vlCondominio)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>IPTU</span>
            <span>{formatCurrency(vlIptu)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleClick}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver mais
          </button>
          <ShareButtonCard
            id={id}
            title={titulo}
            description={descricao}
            images={imagens}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RealEstateCard;