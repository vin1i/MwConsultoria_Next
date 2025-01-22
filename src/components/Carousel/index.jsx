import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const handleSlideChange = (currentSlide) => {
    const newPage = Math.floor(currentSlide / itemsPerPage);
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />, 
    prevArrow: <CustomArrow direction="prev" />, 
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: handleSlideChange,
    appendDots: (dots) => (
      <StyledDots>
        {dots.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
      </StyledDots>
    ),
  };

  if (!images || images.length === 0) {
    return <FallbackMessage>Nenhuma imagem disponível</FallbackMessage>;
  }

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {images.map((item, index) => (
          <SlideContainer key={index}>
            {item.type === "video" ? (
              <iframe
                src={item.src}
                title={`Vídeo ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <img src={item.src} alt={`Imagem ${index + 1}`} />
            )}
          </SlideContainer>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]),
    })
  ).isRequired,
};

const CustomArrow = ({ direction, onClick }) => (
  <ArrowWrapper direction={direction} onClick={onClick}>
    {direction === "next" ? <FaArrowRight /> : <FaArrowLeft />}
  </ArrowWrapper>
);

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
  }

  iframe {
    width: 100%;
    height: 500px;
    border-radius: 8px;
  }
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "next" ? "right: 10px;" : "left: 10px;")}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const FallbackMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: var(--black);
  padding: 20px;
`;

const StyledDots = styled.ul`
  display: flex !important;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
  padding: 0;
  list-style: none;

  li {
    width: 10px;
    height: 10px;
    margin: 0 3px;
    border-radius: 50%;
    background-color: #ccc;
    transition: background-color 0.3s ease;

    &.slick-active {
      background-color: red;
    }
  }
`;

export default Carousel;
