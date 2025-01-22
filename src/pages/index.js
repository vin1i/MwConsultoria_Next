import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Servicos from "@/components/Servicos/Servicos";
import Footer from "@/components/Footer";
import LinkPreview from "@/components/LinkPreview/LinkPreview"; // Importando o componente

export default function Home() {
  const metaTitle = "MW Consultoria Imobiliária - Encontre o imóvel ideal";
  const metaDescription =
    "Bem-vindo à MW Consultoria Imobiliária. Encontre os melhores imóveis para compra e locação.";
  const metaImage = "/LogoNovaHome.jpg"; // Substitua pelo caminho real da imagem
  const metaUrl = "https://www.mwconsultoriaimobiliaria.com.br";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={metaUrl} />
        <meta property="og:type" content="website" />
      </Head>

      <section id="inicio">
        <Banner />
      </section>

      <section id="sobre-nos">
        <About />
      </section>

      <section id="servicos">
        <Servicos />
      </section>

      {/* Adicionando o componente LinkPreview */}
      <section id="link-preview" className="my-10">
        <h2 className="text-center text-2xl font-bold mb-6">Visualizador de Links</h2>
        <div className="flex justify-center">
          <LinkPreview url="https://www.google.com" />
        </div>
      </section>

      <Footer />
    </>
  );
}
