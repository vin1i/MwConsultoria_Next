import React from "react";
import Link from "next/link"; // Next.js usa 'next/link'
import Image from "next/image";
import LogoImg from "/public/images/MarisaWebberLogo.png";
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
  return (
    <header className="relative w-full bg-white shadow-md border-b-2 border-primary">
      {/* Desktop & Tablet Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/" className="flex">
              <Image
                src={LogoImg}
                alt="Logo"
                className="h-auto w-[180px] sm:w-[190px] md:w-[140px] lg:w-[180px] xl:w-[200px] object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-4 lg:space-x-8">
              {[
                { href: "/#inicio", label: "INÍCIO" },
                { href: "/#sobre-nos", label: "SOBRE NÓS" },
                { href: "/#servicos", label: "SERVIÇOS" },
                { href: "/imoveis", label: "IMÓVEIS" },
                { href: "#footer", label: "CONTATO" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="whitespace-nowrap text-xs lg:text-[16px] font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Icons - Desktop & Tablet */}
          <div className="hidden md:flex flex-1 items-center justify-end space-x-2 lg:space-x-4">
            <a
              href="https://www.instagram.com/consultoramarisawebber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors p-2"
            >
              <FaInstagram size={23} />
            </a>
            <a
              href="https://www.facebook.com/Marisa.Webber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors p-2"
            >
              <FaFacebookSquare size={23} />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5511973738808"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors p-2"
            >
              <FaWhatsapp size={23} />
            </a>
            <a
              href="https://www.linkedin.com/in/marisa-webber-377980329"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors p-2"
            >
              <FaLinkedin size={23} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
        <div className="grid h-16 grid-cols-5">
          <Link
            href="/#inicio"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-primary px-1"
          >
            <FaHome size={18} />
            <span className="mt-1 text-[10px]">Início</span>
          </Link>
          <Link
            href="/#sobre-nos"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-primary px-1"
          >
            <FaInfoCircle size={18} />
            <span className="mt-1 text-[10px]">Sobre</span>
          </Link>
          <Link
            href="/#servicos"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-primary px-1"
          >
            <FaClipboardList size={18} />
            <span className="mt-1 text-[10px]">Serviços</span>
          </Link>
          <Link
            href="/imoveis"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-primary px-1"
          >
            <FaBuilding size={18} />
            <span className="mt-1 text-[10px]">Imóveis</span>
          </Link>
          <Link
            href="#footer"
            className="flex flex-col items-center justify-center text-gray-600 hover:text-primary px-1"
          >
            <FaPhoneAlt size={18} />
            <span className="mt-1 text-[10px]">Contato</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
