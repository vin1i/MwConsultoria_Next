import Head from "next/head";
import { GetServerSideProps } from "next";
import { getImageUrl } from "@/utils/getImageUrl";

interface ImageIdPageProps {
  imageId: string;
}

const ImageIdPage: React.FC<ImageIdPageProps> = ({ imageId }) => {
  const url = `https://mwconsultoriaimobiliaria.com.br/images/${imageId}`;
  const imageUrl = getImageUrl(imageId);

  return (
    <>
      <Head>
        {/* Meta Tags Específicas para SEO e Previews */}
        <title>Imóvel {imageId} - MW Consultoria Imobiliária</title>
        <meta
          name="description"
          content="Confira este imóvel disponível na MW Consultoria Imobiliária. Não perca!"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph (Facebook, WhatsApp, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Imóvel ${imageId} - MW Consultoria Imobiliária`} />
        <meta
          property="og:description"
          content="Confira este imóvel disponível na MW Consultoria Imobiliária. Não perca!"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:url" content={url} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Imóvel ${imageId} - MW Consultoria Imobiliária`} />
        <meta
          name="twitter:description"
          content="Confira este imóvel disponível na MW Consultoria Imobiliária. Não perca!"
        />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:site" content="@mwconsultoriaimobiliaria" />
      </Head>

      {/* Renderização da Imagem */}
      <main className="container mx-auto mt-12 flex min-h-screen justify-center">
        <img
          alt={`Imagem do imóvelVini ${imageId}`}
          title={`Imagem do imóvel ${imageId}`}
          className="mb-12 h-96 w-96 rounded-3xl"
          src={imageUrl}
        />
      </main>
    </>
  );
};

export default ImageIdPage;

// Configuração do SSR para buscar o `imageId` da URL
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const imageId = params?.id as string;

  if (!imageId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      imageId,
    },
  };
};
