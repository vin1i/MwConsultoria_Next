import styled, { keyframes, css } from "styled-components"

const growLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  min-height: 80vh;
  border-radius: 10px;
  background-image: url(${(props) => props.$background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    min-height: 70vh;
    padding: 30px 60px;
  }

  /* Desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    min-height: 70vh;
    padding: 30px 50px;
  }

  /* Small desktop and large tablets */
  @media (min-width: 1025px) and (max-width: 1280px) {
    min-height: 65vh;
    padding: 25px 40px;
  }

  /* Tablets */
  @media (min-width: 885px) and (max-width: 1024px) {
    min-height: 60vh;
    padding: 25px 30px;
  }
  
  /* Mobile devices and small tablets */
  @media (max-width: 884px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    min-height: auto;
    background-image: none;
    background-color: var(--white);
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    padding: 30px 15px;
  }
`

export const TransitionLine = styled.div`
  width: 0;
  height: 3px; /* Reduced from 4px for better proportion */
  background-color: var(--red);
  margin: 12px 0; /* Reduced from 15px */

  ${(props) =>
    props.$isVisible &&
    css`
      animation: ${growLine} 1s ease-in-out forwards;
    `}
`

export const LogoTop = styled.img`
  width: 15%; /* Use percentage instead of fixed width */
  min-width: 200px; /* Set minimum width */
  max-width: 200px; /* Set maximum width */
  height: auto;
  display: block;
  margin: 0 auto;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    width: 14%;
  }

  /* Desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    width: 15%;
  }

  /* Small desktop and large tablets */
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 16%;
  }

  /* Tablets */
  @media (min-width: 885px) and (max-width: 1024px) {
    width: 18%;
  }
  
  /* Mobile devices and small tablets */
  @media (max-width: 884px) {
    width: 25%;
    max-width: 150px;
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    width: 30%;
    min-width: 100px;
    max-width: 120px;
  }
`

export const TextContainer = styled.div`
  width: 50%;  /* Aumente o width, pode ir de 60% até 80% para distribuir melhor */
  padding-left: 8%;
  color: var(--black);
  z-index: 2;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    width: 45%;
    padding-left: 10%;
  }

  /* Desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    width: 50%;
    padding-left: 8%;
  }

  /* Small desktop and large tablets */
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 55%;
    padding-left: 6%;
  }

  /* Tablets */
  @media (min-width: 885px) and (max-width: 1024px) {
    width: 60%;
    padding-left: 5%;
  }

  /* Mobile devices and small tablets */
  @media (max-width: 884px) {
    width: 90%;
    padding: 20px;
    text-align: center;  /* Para textos menores, manter no centro */
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`


export const Text = styled.div`
  font-size: clamp(1rem, 1.5vw, 1.4rem); /* Responsive font size using clamp */
  line-height: 1.6;

  p {
    margin-bottom: 15px;
    color: var(--black);
  }

  /* Large desktop screens */
  @media (min-width: 1441px) {
    font-size: clamp(1.2rem, 1.6vw, 1.5rem);
    line-height: 1.7;
  }

  /* Desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    font-size: clamp(1.1rem, 1.5vw, 1.4rem);
    line-height: 1.6;
  }

  /* Small desktop and large tablets */
  @media (min-width: 1025px) and (max-width: 1280px) {
    font-size: clamp(1rem, 1.4vw, 1.3rem);
    line-height: 1.5;
  }

  /* Tablets */
  @media (min-width: 885px) and (max-width: 1024px) {
    font-size: clamp(0.9rem, 1.3vw, 1.2rem);
    line-height: 1.5;
  }
  
  /* Mobile devices and small tablets */
  @media (max-width: 884px) {
    font-size: clamp(0.9rem, 4vw, 1.2rem);
    line-height: 1.5;
    text-align: center;
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    font-size: clamp(0.8rem, 4vw, 1rem);
    line-height: 1.4;
  }
`

export const Logo = styled.img`
  margin-top: 30px;
  width: 60%; /* Use percentage instead of fixed width */
  max-width: 250px;
  height: auto;
  display: block;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    width: 65%;
    max-width: 280px;
    margin-top: 40px;
  }

  /* Desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    width: 60%;
    max-width: 250px;
    margin-top: 35px;
  }

  /* Small desktop and large tablets */
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 55%;
    max-width: 230px;
    margin-top: 30px;
  }

  /* Tablets */
  @media (min-width: 885px) and (max-width: 1024px) {
    width: 50%;
    max-width: 220px;
    margin-top: 25px;
  }
  
  /* Mobile devices and small tablets */
  @media (max-width: 884px) {
    display: none;
  }
`

