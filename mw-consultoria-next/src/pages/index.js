import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Servicos from "@/components/Servicos/Servicos";
import Footer from "@/components/Footer";

export default function Home() {
  const metaTitle = "MW Consultoria Imobiliária - Encontre o imóvel ideal";
  const metaDescription =
    "Bem-vindo à MW Consultoria Imobiliária. Encontre os melhores imóveis para compra e locação.";
  const metaImage = "/default-share-image.jpg"; // Substitua pelo caminho real da imagem
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
    </>
  );
}
