import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper"; 
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const ImageCarousel = ({ media, cloudinaryBaseUrl }) => {
  if (!media || media.length === 0) {
    return <FallbackMessage>Nenhuma mídia disponível</FallbackMessage>;
  }

  return (
    <CarouselContainer>
      <ImageContainer isCarousel>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{ delay: 3000 }}
          loop
          className="custom-swiper"
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === "video" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={item.src.replace("watch?v=", "embed/")}
                  title={`Vídeo ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <ImageWrapper>
                  <Image
                    src={
                      item.src.startsWith("http")
                        ? item.src
                        : `${cloudinaryBaseUrl}/image/upload/${item.src}`
                    }
                    alt={`Imagem ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </ImageWrapper>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageContainer>
      {/* Arrows customizadas */}
      <CustomPrevButton className="custom-prev">
        <FaArrowLeft />
      </CustomPrevButton>
      <CustomNextButton className="custom-next">
        <FaArrowRight />
      </CustomNextButton>
    </CarouselContainer>
  );
};

ImageCarousel.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]).isRequired,
    })
  ).isRequired,
  cloudinaryBaseUrl: PropTypes.string.isRequired,
};

const CarouselContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }

  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const ImageContainer = styled.div`
  flex: ${({ isCarousel }) => (isCarousel ? "1" : "1.5")};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-right: ${({ isCarousel }) => (isCarousel ? "0" : "20px")};
  border-radius: 8px;
  max-width: ${({ isCarousel }) => (isCarousel ? "100%" : "400px")};
  height: ${({ isCarousel }) => (isCarousel ? "300px" : "auto")};

  @media (max-width: 768px) {
    margin-right: 0;
    height: auto;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 75%; /* Mantém a proporção de 4:3 */

  img {
    object-fit: cover;
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  color: var(--black);
  text-align: center;
  padding: 20px;
`;

const CustomPrevButton = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const CustomNextButton = styled(CustomPrevButton)`
  left: auto;
  right: 15px;
`;

export default ImageCarousel;
