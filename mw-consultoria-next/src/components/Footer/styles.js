import styled from "styled-components";

export const Container = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 30px 20px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }
`;

export const RedLine = styled.div`
  background-color: var(--red);
  height: 3px;
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .footer-logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .footer-logo-text {
    font-size: 1rem;
    font-weight: bold;
    color: var(--black);
    text-transform: uppercase;
  }

  .footer-social-logo {
    width: 120px;
    height: auto;
  }

  @media (max-width: 768px) {
    .footer-logo-text {
      font-size: 1rem;
    }

    .footer-social-logo {
      width: 80px;
    }
  }
`;

export const SectionTitle = styled.h3`
  color: var(--red);
  font-size: 1.4rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .phone-number {
    color: var(--black);
    font-size: 2rem;
    font-weight: bold;
  }

  a,
  span {
    color: var(--black);
    text-decoration: none;
    font-size: 1.3rem;
    cursor: pointer;

    &:hover {
      color: var(--red);
    }
  }

  @media (max-width: 768px) {
    .phone-number {
      font-size: 1.8rem;
    }

    a,
    span {
      font-size: 1.1rem;
    }
  }
`;  

export const SocialMedia = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: var(--black);
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
      color: var(--red);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    gap: 15px;
  }
`;

export const FooterBar = styled.div`
  font-size: 1rem;
  background-color: var(--black);
  color: var(--white);
  text-align: center;
  padding: 10px 0;
  width: 100%;
  margin-top: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 0;
  }
`;

export const WhatsAppButtonRedondo = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--light-green);
  color: var(--white);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #16ac32;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 75px;
    right: 15px;
  }
`;

export const QRButton = styled.button`
  background-color: var(--red);
  color: var(--white);
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: 150px;
  margin: 10px auto;

  &:hover {
    background-color: var(--dark-red);
  }

  @media (max-width: 768px) {
    max-width: 140px;
    gap: 6px;
    padding: 6px 13px;
  }
`;

export const QRModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const QRCodeContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
    color: var(--black);
  }

  button {
    background-color: var(--red);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--dark-red);
    }
  }
`;

export const QRCodeImage = styled.img`
  width: 300px;
  height: auto;
  margin: 20px auto;
  display: block;

  @media (max-width: 768px) {
    width: 250px;
  }
`;
