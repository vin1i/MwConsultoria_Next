// import React from "react";
// import PropTypes from "prop-types";
// import Link from "next/link";
// import {
//   FaMapMarkerAlt,
//   FaBed,
//   FaBath,
//   FaCar,
//   FaDoorClosed,
//   FaRulerCombined,
// } from "react-icons/fa";
// import {
//   CardContainer,
//   ImageContainer,
//   InfoContainer,
//   Title,
//   Address,
//   Features,
//   PriceContainer,
//   MainPrice,
//   SecondaryPrice,
//   StatusBadge,
//   Description,
//   Button,
// } from "./styles";
// import ImageCarousel from "../ImageCarousel";
// import ShareIcon from "../ImovelDetail/shareIcon";

// const Card = ({
//   id,
//   endereco,
//   valorVenda,
//   valorLocacao,
//   vlCondominio,
//   vlIptu,
//   imagens,
//   videos,
//   titulo,
//   quartos,
//   banheiros,
//   vagas,
//   metrosQuadrados,
//   suites,
//   descricao,
//   disponibilidade,
// }) => {
//   const cloudinaryBaseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`;
//   const media = [
//     ...(imagens || []).map((img) => ({ src: img, type: "image" })),
//     ...(videos || []).map((vid) => ({ src: vid, type: "video" })),
//   ];

//   return (
//     <CardContainer>
//     <div
//         style={{
//           flex: 1,
//           padding: "8px",
//           background: "#ffffff",
//           overflow: "hidden",
//           aspectRatio: 4 / 3
//         }}
//       >
//         <ImageCarousel
        
//           media={media}
//           cloudinaryBaseUrl={cloudinaryBaseUrl}
//           showDots={false}
//         />
//       </div>
//       <InfoContainer>
//         <Title>{titulo || "Sem título"}</Title>
//         <Address>
//           <FaMapMarkerAlt /> {endereco}
//         </Address>
//         <Description>
//           {descricao
//             ? `${descricao.substring(0, 100)}...`
//             : "Descrição não disponível."}
//         </Description>
//         <Features>
//           <span>
//             <FaRulerCombined /> {metrosQuadrados || 0} m²
//           </span>
//           <span>
//             <FaBed /> {quartos || 0} Quartos
//           </span>
//           <span>
//             <FaDoorClosed /> {suites || 0} Suítes
//           </span>
//           <span>
//             <FaBath /> {banheiros || 0} Banheiros
//           </span>
//           <span>
//             <FaCar /> {vagas || 0} Vagas
//           </span>
//         </Features>
//         <PriceContainer>
//           {valorVenda > 0 && (
//             <MainPrice>
//               {parseFloat(valorVenda).toLocaleString("pt-BR", {
//                 style: "currency",
//                 currency: "BRL",
//               })}
//             </MainPrice>
//           )}
//           {valorLocacao > 0 && (
//             <MainPrice>
//               {parseFloat(valorLocacao).toLocaleString("pt-BR", {
//                 style: "currency",
//                 currency: "BRL",
//               })}
//             </MainPrice>
//           )}
//           <SecondaryPrice>
//             {vlCondominio > 0 && (
//               <p>
//                 <strong>Condomínio:</strong>{" "}
//                 {parseFloat(vlCondominio).toLocaleString("pt-BR", {
//                   style: "currency",
//                   currency: "BRL",
//                 })}
//               </p>
//             )}
//             {vlIptu > 0 && (
//               <p>
//                 <strong>IPTU:</strong>{" "}
//                 {parseFloat(vlIptu).toLocaleString("pt-BR", {
//                   style: "currency",
//                   currency: "BRL",
//                 })}
//               </p>
//             )}
//             <StatusBadge $status={disponibilidade}>
//               {disponibilidade || "Status não informado"}
//             </StatusBadge>
//           </SecondaryPrice>
//         </PriceContainer>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <Link href={`/imoveis/${id}`} passHref>
//             <Button>VER MAIS</Button>
//           </Link>

//           <ShareIcon   link={`https://www.mwconsultoriaimobiliaria.com.br/imoveis/${id}`}
//             image={imagens && imagens[0]}
//             title={titulo}
//             description={descricao} />
//         </div>
//       </InfoContainer>
//     </CardContainer>
//   );
// };

// Card.propTypes = {
//   id: PropTypes.string.isRequired,
//   titulo: PropTypes.string,
//   endereco: PropTypes.string,
//   valorVenda: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   valorLocacao: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   vlCondominio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   vlIptu: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   imagens: PropTypes.arrayOf(PropTypes.string),
//   videos: PropTypes.arrayOf(PropTypes.string),
//   quartos: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   banheiros: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   vagas: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   metrosQuadrados: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   suites: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   descricao: PropTypes.string,
//   disponibilidade: PropTypes.string,
// };

// export default Card;
