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
  const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;

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
      <Head>
       {/* Meta Tags Gerais */}
  <title>{metaTitle}</title>
  <meta name="description" content={metaDescription} />

  {/* Open Graph Meta Tags (Facebook, WhatsApp, LinkedIn) */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={metaImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content={metaUrl} />
  <meta property="og:locale" content="pt_BR" />

  {/* Twitter Meta Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={metaImage} />
  <meta name="twitter:url" content={metaUrl} />
  <meta name="twitter:site" content="@mwconsultoriaimobiliaria" />

  
</Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative w-full max-w-[400px] overflow-hidden rounded-lg bg-RealEstateCard shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative">
          <PropertyImageCarousel media={media} />
          <span
            className={`absolute left-4 top-4 z-30 rounded-full px-3 py-1 text-xs font-semibold text-white ${getStatusColor(
              disponibilidade
            )}`}
          >
            {disponibilidade}
          </span>
        </div>

        <div className="space-y-4 py-4 sm:px-2 px-4 rounded-lg bg-white flex flex-col min-h-[400px]">
          <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-primary">{titulo}</h3>
            <div className="mt-2 flex items-start text-sm text-gray-600">
              <MapPin className="mr-2 h-4 w-4 text-primary" />
              {endereco}
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
              image={imagens[0]}
              
 
/>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RealEstateCard;
