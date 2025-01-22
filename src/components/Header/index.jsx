import React from "react";
import Link from "next/link"; 
import LogoImg from "/public/images/MarisaWebberLogo.png";
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
import Image from "next/image";
const Header = () => {
  return (
    <Container>
      <Logo>
        <Link href="/">
          <Image src={LogoImg.src} alt="Logo" 
          width={200}  // Defina a largura da imagem
          height={100}/>
        </Link>
      </Logo>
      <Menu>
        <ul>
          <li>
            <Link href="/#inicio">
              <span>INÍCIO</span>
            </Link>
          </li>
          <li>
            <Link href="/#sobre-nos">
              <span>SOBRE NÓS</span>
            </Link>
          </li>
          <li>
            <Link href="/#servicos">
              <span>SERVIÇOS</span>
            </Link>
          </li>
          <li>
            <Link href="/imoveis">
              <span>IMÓVEIS</span>
            </Link>
          </li>
          <li>
            <Link href="#footer">
              <span>CONTATO</span>
            </Link>
          </li>
        </ul>
      </Menu>

      <SocialLinks>
        <a
          href="https:/www.instagram.com/consultoramarisawebber?igsh=MThsY29nYmhqbXgybA=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={25} />
        </a>
        <a
          href="https:/www.facebook.com/Marisa.Webber"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare size={25} />
        </a>
        <a
          href="https:/api.whatsapp.com/send?phone=5511973738808"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp size={25} />
        </a>
        <a
          href="https:/www.linkedin.com/in/marisa-webber-377980329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={25} />
        </a>
      </SocialLinks>

      <BottomNav>
        <BottomNavItem>
          <Link href="/#inicio">
            <FaHome size={24} />
            <span>Início</span>
          </Link>
        </BottomNavItem>
        <BottomNavItem>
          <Link href="/#sobre-nos">
            <FaInfoCircle size={24} />
            <span>Sobre</span>
          </Link>
        </BottomNavItem>
        <BottomNavItem>
          <Link href="/#servicos">
            <FaClipboardList size={24} />
            <span>Serviços</span>
          </Link>
        </BottomNavItem>
        <BottomNavItem>
          <Link href="/imoveis">
            <FaBuilding size={24} />
            <span>Imóveis</span>
          </Link>
        </BottomNavItem>
        <BottomNavItem>
          <Link href="/#footer">
            <FaPhoneAlt size={24} />
            <span>Contato</span>
          </Link>
        </BottomNavItem>
      </BottomNav>
    </Container>
  );
};

export default Header;
