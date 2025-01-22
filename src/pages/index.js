import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Servicos from "@/components/Servicos/Servicos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        {/* SEO e Open Graph Tags específicas para a página inicial */}
        <title>MW Consultoria Imobiliária - Encontre o imóvel ideal</title>
        <meta name="description" content="Bem-vindo à MW Consultoria Imobiliária. Encontre os melhores imóveis para compra e locação." />
        <meta property="og:title" content="MW Consultoria Imobiliária - Encontre o imóvel ideal" />
        <meta property="og:description" content="Bem-vindo à MW Consultoria Imobiliária. Encontre os melhores imóveis para compra e locação." />
        <meta property="og:image" content="https://mwconsultoriaimobiliaria.com.br/default-image.jpg" />
        <meta property="og:url" content="https://mwconsultoriaimobiliaria.com.br" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MW Consultoria Imobiliária - Encontre o imóvel ideal" />
        <meta name="twitter:description" content="Bem-vindo à MW Consultoria Imobiliária. Encontre os melhores imóveis para compra e locação." />
        <meta name="twitter:image" content="https://mwconsultoriaimobiliaria.com.br/default-image.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mwconsultoriaimobiliaria.com.br" />
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
