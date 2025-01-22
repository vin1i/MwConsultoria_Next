import styled, { keyframes, css } from "styled-components";

const growLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  padding-bottom: 50px;
  min-height: 120vh;
  background-image: url(${(props) => props.$background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  @media (max-width: 1024px) {
    
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    background-size: contain;
    background-position: center bottom;
    min-height: 60vh;
    padding: 20px 40px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    min-height: auto;
    background-image: none;
    background-color: var(--white);
  }
`;

export const TransitionLine = styled.div`
  width: 0;
  height: 4px;
  background-color: var(--red);
  margin: 20px 0;

  ${(props) =>
    props.$isVisible &&
    css`
      animation: ${growLine} 1s ease-in-out forwards;
    `}
`;

export const LogoTop = styled.img`
  max-width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

export const TextContainer = styled.div`
  width: 55%;
  padding-left: 150px;
  color: var(--black);
  z-index: 2;

  @media (max-width: 1024px) {
    padding-left: 50px;
    width: 60%;
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 90%;
    text-align: center;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Text = styled.div`
  font-size: 1.6rem;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
    color: var(--black);
  }

  @media (max-width: 1024px) {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    line-height: 1.5;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

export const Logo = styled.img`
  margin-top: 60px;
  max-width: 300px;
  height: auto;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;
