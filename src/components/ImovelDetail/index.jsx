import React, { useState, useEffect } from "react";
import Head from "next/head";
import { MapPin, Bed, Bath, Car, Maximize2, Star } from "lucide-react";
import { useRouter } from "next/router";
import {
  Wrapper,
  ContentContainer,
  Title,
  Address,
  Price,
  Features,
  Description,
  WhatsAppButton,
  CarouselWrapper,
  StatusBadge,
} from "./styles";
import {
  FaBath,
  FaBed,
  FaCar,
  FaDoorClosed,
  FaRulerCombined,
  FaWhatsapp,
} from "react-icons/fa";
import Carousel from "../Carousel";
import { getImovelById } from "@/services/firebase/firestoreService";
import { ShareButton } from "../ShareButton/ShareButton";
const ImobiDetails = ({ initialProperty }) => {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState(initialProperty || null);
  const [isLoading, setIsLoading] = useState(!initialProperty);
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; // Se o id ainda não estiver disponível, não faça a requisição.

      setIsLoading(true);
      try {
        const propertyData = await getImovelById(id);
        if (propertyData) {
          setProperty({
            ...propertyData,
            valorVenda: propertyData.valorVenda || 0,
            valorLocacao: propertyData.valorLocacao || 0,
            vlCondominio: propertyData.vlCondominio || 0,
            vlIptu: propertyData.vlIptu || 0,
          });
        } else {
          console.error("Imóvel não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar imóvel:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          <span role="img" aria-label="Carregando">
            ⏳
          </span>{" "}
          Carregando detalhes do imóvel...
        </p>
      </Wrapper>
    );
  }

  if (!property) {
    return (
      <Wrapper>
        <p style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
          Imóvel não encontrado.
        </p>
      </Wrapper>
    );
  }

  const images = property.imagens?.length
    ? property.imagens.map((img) => {
        const imageUrl = img.startsWith("http")
          ? img
          : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${img}`;
        return {
          src: imageUrl,
          type: "image",
        };
      })
    : [
        {
          src: "https://via.placeholder.com/300x200?text=Sem+Imagem",
          type: "image",
        },
      ];

  if (property.videos?.length > 0) {
    property.videos.forEach((videoURL) => {
      let embedURL = "";

      if (videoURL.includes("youtube.com/shorts")) {
        embedURL = videoURL.replace("youtube.com/shorts", "youtube.com/embed");
      } else if (videoURL.includes("youtube.com/watch")) {
        embedURL = videoURL.replace("watch?v=", "embed/");
      } else {
        console.warn(`URL de vídeo inválida:`, videoURL);
      }

      if (embedURL) {
        images.push({
          src: embedURL,
          type: "video",
        });
      }
    });
  }

  const metaTitle =
    property.titulo || "Imóvel disponível | MW Consultoria Imobiliária";
  const metaDescription =
    property.descricao?.substring(0, 150) ||
    "Confira este imóvel disponível na MW Consultoria Imobiliária.";
  const metaImage =
    images[0]?.src || "https://via.placeholder.com/300x200?text=Sem+Imagem";
  const metaUrl = `https://mwconsultoriaimobiliaria.com.br/imoveis/${id}/`;

  return (
    <Wrapper>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <CarouselWrapper>
        <Carousel images={images} />
      </CarouselWrapper>
      <ContentContainer>
        <Title>{property.titulo || property.tipo || "Sem Título"}</Title>
        <Address>{property.endereco || "Endereço não informado"}</Address>
        <Features>
          <p>
            <Maximize2 /> {property.metrosQuadrados || 0} m²
          </p>
          <p>
            <Bed /> {property.quartos || 0} quartos
          </p>
          <p>
            <Star /> {property.suites || 0} suítes
          </p>
          <p>
            <Bath /> {property.banheiros || 0} banheiros
          </p>
          <p>
            <Car /> {property.vagas || 0} vagas
          </p>
        </Features>
        <Price>
          <div className="price-container">
            {property.valorVenda > 0 && (
              <div className="price-item highlight">
                <span className="label">Venda</span>
                <span className="value">
                  {property.valorVenda.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}
            {property.valorLocacao > 0 && (
              <div className="price-item highlight">
                <span className="label">Locação</span>
                <span className="value">
                  {property.valorLocacao.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}

            {property.vlCondominio > 0 && (
              <div className="price-item">
                <span className="label">Condomínio</span>
                <span className="value">
                  {property.vlCondominio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}

            <div className="price-item">
              <span className="label">IPTU</span>
              <span className="value">
                {property.vlIptu > 0
                  ? property.vlIptu.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "não informado"}
              </span>
            </div>

            <StatusBadge status={property.disponibilidade}>
              {property.disponibilidade || "Status não informado"}
            </StatusBadge>
          </div>
        </Price>

        <Description style={{ whiteSpace: "pre-wrap" }}>
          {property.descricao || "Descrição não disponível."}
        </Description>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <WhatsAppButton
            href={`https://api.whatsapp.com/send?phone=5511973738808&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel%20${
              property.titulo || property.tipo
            }%20em%20${property.endereco}.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale conosco!
            <FaWhatsapp />
          </WhatsAppButton>
          <ShareButton id={id} image={metaImage} />
        </div>
      </ContentContainer>
    </Wrapper>
  );
};

export default ImobiDetails;
