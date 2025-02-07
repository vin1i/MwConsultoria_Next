import React from "react";
import Head from "next/head";
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
  titulo: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  metrosQuadrados: number;
  suites: number;
  descricao: string;
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
  const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/`;

  const media = [
    ...(imagens || []).map((img) => ({
      src: img.startsWith("http") ? img : `${cloudinaryBaseUrl}${img}`,
      type: "image" as "image",
    })),
  ];

  const metaTitle = titulo || "Imóvel disponível | MW Consultoria Imobiliária";
  const metaDescription =
    descricao?.substring(0, 150) ||
    "Confira este imóvel disponível na MW Consultoria Imobiliária.";
  const metaImage =
    media[0]?.src || "https://via.placeholder.com/1200x630?text=Imagem+não+disponível";
  const metaUrl = `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}?cachebuster=${Date.now()}`;

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
    setIsLoading(true);
    router.push(`/imoveis/${id}`).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  };
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative w-full max-w-[400px] h-full flex flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
    >
        <div className="relative">
          {/* Faz a imagem ser um link para o imóvel */}
          <a href="#" className="absolute inset-0 z-20" onClick={handleClick} ></a>
          <PropertyImageCarousel media={media} />
          <span
            className={`absolute left-4 top-4 z-30 rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor(
              disponibilidade
            )}`}
          >
            {disponibilidade}
          </span>
        </div>

      <div className="flex h-full flex-col p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-primary line-clamp-2">
            {titulo}
          </h3>
          <div className="mt-2 flex items-start text-sm text-gray-600">
            <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-2">{endereco}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-0 gap-y-2 text-base 2xl:text-sm md:text-xs sm:grid-cols-2">
  <div className="flex items-center gap-2">
    <Maximize2 className="h-4 w-4 text-primary" />
    <span>{metrosQuadrados} m²</span>
  </div>
  <div className="flex items-center gap-2">
    <Bed className="h-4 w-4 text-primary" />
    <span>{quartos} Quartos</span>
  </div>
  <div className="flex items-center gap-2">
    <Star className="h-4 w-4 text-primary" />
    <span>{suites} Suítes</span>
  </div>
  <div className="flex items-center gap-2">
    <Bath className="h-4 w-4 text-primary" />
    <span>{banheiros} Banheiros</span>
  </div>
  <div className="flex items-center gap-2">
    <Car className="h-4 w-4 text-primary" />
    <span>{vagas} Vagas</span>
  </div>
</div>

        <div className="mt-auto space-y-2 border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Valor</span>
            
            <span className="text-lg font-semibold text-primary">
            {/* Caso o valor de venda seja 0, o valor de locação se torna o valor de venda. */}
              { valorVenda > 0 && formatCurrency(valorVenda) }
              { valorLocacao > 0 && valorLocacao > 0  }
              { valorLocacao > 0 && formatCurrency(valorLocacao) }
            {/* Caso o valor de venda seja 0, o valor de locação se torna o valor de venda. */}
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

        <div className="flex gap-2 pt-4">
          <button onClick={handleClick} 
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/200">
            Ver detalhes
          </button>
          <ShareButtonCard
              id={id}
              title={titulo} 
              description={descricao} 
              image={imagens[0]}
              />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default RealEstateCard;