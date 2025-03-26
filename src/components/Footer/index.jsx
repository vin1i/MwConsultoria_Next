import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Container,
  Section,
  SectionTitle,
  LinkList,
  SocialMedia,
  FooterBar,
  WhatsAppButtonRedondo,
  RedLine,
  QRButton,
  QRModal,
  QRCodeContainer,
  QRCodeImage,
} from "./styles";
import {
  FaFacebookSquare,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaQrcode,
} from "react-icons/fa";
import QRCode from "/public/images/QrCodeMarisaWeber.jpeg"; // Ajuste do caminho
import LogoMW from "../../../public/images/MarisaWebberLogo.png"; // Ajuste do caminho

const Footer = ({ id }) => {
  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR((prev) => !prev);
  };

  return (
    <>
      <RedLine />
      <Container id="footer">
        <Section>
          <SectionTitle>Redes Sociais</SectionTitle>
          <SocialMedia>
            <a
              href="https://www.instagram.com/consultoramarisawebber?igsh=MThsY29nYmhqbXgybA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/Marisa.Webber"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5511973738808"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.linkedin.com/in/marisa-webber-377980329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </SocialMedia>
          <div className="footer-logo-container">
            {/* <span className="footer-logo-text">ASSOCIADA</span>{" "} */}
            <Image
              src={LogoMW}
              alt="Logo no footer"
              className="footer-social-logo"
              width={150}
              height={50}
            />
          </div>
        </Section>

        <Section>
          <SectionTitle>Contatos</SectionTitle>
          <LinkList>
            <Link href="/#inicio">
              <span>INÍCIO</span>
            </Link>
            <Link href="/#sobre-nos">
              <span>QUEM SOMOS</span>
            </Link>
            <Link href="/#servicos">
              <span>SERVIÇOS</span>
            </Link>
            <Link href="/imoveis">
              <span>IMÓVEIS</span>
            </Link>
          </LinkList>
        </Section>

        <Section>
          <LinkList>
            <span className="phone-number">11 97373-8808</span>
            <a href="mailto:marisawebbersp@gmail.com">
              marisawebbersp@gmail.com
            </a>
            <QRButton onClick={toggleQR}>
              <FaQrcode size={20} />
              Ver QR Code
            </QRButton>
          </LinkList>
        </Section>
      </Container>

      <WhatsAppButtonRedondo
        href="https://api.whatsapp.com/send?phone=5511973738808"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={30} />
      </WhatsAppButtonRedondo>

      <FooterBar>
        <span>2024 - Criado e desenvolvido por Inovação Marketing</span>
      </FooterBar>

      {showQR && (
        <QRModal onClick={toggleQR}>
          <QRCodeContainer onClick={(e) => e.stopPropagation()}>
            <h3>Contato via QR Code</h3>
            <QRCodeImage src={QRCode.src} alt="QR Code para redes sociais" />
            <div>
              <button
                onClick={() =>
                  window.open("https://beacons.ai/marisawebber", "_blank", "noopener,noreferrer")
                }
              >
                Acesse agora
              </button>
            </div>
            <button onClick={toggleQR}>Fechar</button>
          </QRCodeContainer>
        </QRModal>
      )}
    </>
  );
};

export default Footer;
