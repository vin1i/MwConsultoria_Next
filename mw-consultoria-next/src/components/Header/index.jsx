import React from "react";
import Link from "next/link"; // Importação do Link do Next.js
import LogoImg from "/public/images/MarisaWebberLogo.png"; // Certifique-se de que o logo está em public/images
import {
  Container,
  Logo,
  Menu,
  SocialLinks,
  BottomNav,
  BottomNavItem,
} from "./styles";
import {
  FaFacebookSquare,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaHome,
  FaBuilding,
  FaInfoCircle,
  FaClipboardList,
  FaPhoneAlt,
} from "react-icons/fa";

const Header = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container>
      <Logo>
        <Link href="/">
          <img src={LogoImg.src} alt="Logo" />
        </Link>
      </Logo>
      <Menu>
        <ul>
          <li onClick={() => scrollToSection("inicio")}>
            <span>INÍCIO</span>
          </li>
          <li onClick={() => scrollToSection("sobre-nos")}>
            <span>SOBRE NÓS</span>
          </li>
          <li onClick={() => scrollToSection("servicos")}>
            <span>SERVIÇOS</span>
          </li>
          <li>
            <Link href="/imoveis">
              <span>IMÓVEIS</span>
            </Link>
          </li>
          <li onClick={() => scrollToSection("footer")}>
            <span>CONTATO</span>
          </li>
        </ul>
      </Menu>

      <SocialLinks>
        <a
          href="https://www.instagram.com/consultoramarisawebber?igsh=MThsY29nYmhqbXgybA=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={25} />
        </a>
        <a
          href="https://www.facebook.com/Marisa.Webber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare size={25} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5511973738808"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={25} />
        </a>
        <a
          href="https://www.linkedin.com/in/marisa-webber-377980329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={25} />
        </a>
      </SocialLinks>

      <BottomNav>
        <BottomNavItem onClick={() => scrollToSection("inicio")}>
          <FaHome size={24} />
          <span>Início</span>
        </BottomNavItem>
        <BottomNavItem onClick={() => scrollToSection("sobre-nos")}>
          <FaInfoCircle size={24} />
          <span>Sobre</span>
        </BottomNavItem>
        <BottomNavItem onClick={() => scrollToSection("servicos")}>
          <FaClipboardList size={24} />
          <span>Serviços</span>
        </BottomNavItem>
        <BottomNavItem>
          <Link href="/imoveis">
            <FaBuilding size={24} />
            <span>Imóveis</span>
          </Link>
        </BottomNavItem>
        <BottomNavItem onClick={() => scrollToSection("footer")}>
          <FaPhoneAlt size={24} />
          <span>Contato</span>
        </BottomNavItem>
      </BottomNav>
    </Container>
  );
};

export default Header;
