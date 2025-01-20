import React from "react";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Car, Maximize2 } from "lucide-react";
import PropertyImageCarousel from "@/components/ui/PropertyImageCarousel";
import { useRouter } from "next/router"; // Importa o hook useRouter

interface RealEstateCardProps {
  id: string;
  endereco: string;
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
  disponibilidade: "available" | "pending" | "sold";
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
  const router = useRouter(); // Use o hook useRouter

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

  const statusColors: Record<string, string> = {
    available: "bg-badge-available",
    pending: "bg-badge-pending",
    sold: "bg-badge-sold",
  };

  const statusText: Record<string, string> = {
    available: "Disponível",
    pending: "Pendente",
    sold: "Vendido",
  };

  // Função para navegar para a página de detalhes do imóvel
  const handleClick = React.useCallback(() => {
    router.push(`/imoveis/${id}`); // Navega para a página de detalhes usando o ID do imóvel
  }, [router, id]);

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
          className={`absolute right-4 top-4 z-30 rounded-full px-3 py-1 text-xs font-semibold text-white ${statusColors[disponibilidade]}`}
        >
          {statusText[disponibilidade]}
        </span>
      </div>

      <div className="space-y-4 p-6 rounded-lg bg-white flex flex-col min-h-[400px]">
        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-primary">{titulo}</h3>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4" />
            {endereco}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4 text-gray-600" />
              <span>{metrosQuadrados} m²</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-gray-600" />
              <span>{quartos} Quartos</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-gray-600" />
              <span>{banheiros} Banheiros</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-gray-600" />
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

        {/* Botão para redirecionar para a página de detalhes */}
        <button
          onClick={handleClick}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver mais
        </button>
      </div>
    </motion.div>
  );
};

export default RealEstateCard;

