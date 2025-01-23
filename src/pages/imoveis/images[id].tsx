import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getImageUrl } from "@/utils/getImageUrl";

interface ImageIdPageProps {
  imageId: string;
}

const ImageIdPage: React.FC<ImageIdPageProps> = ({ imageId }) => {
  const timestamp = new Date().getTime(); // Gera um timestamp único
  const url = `https://mwconsultoriaimobiliaria.com.br/images/${imageId}`;
  const imageUrl = `${getImageUrl(imageId)}?cachebuster=${timestamp}`;

  return (
    <>
      <Head>
        <title>Imóvel {imageId} - MW Consultoria Imobiliária</title>
        <meta
          name="description"
          content="Confira este imóvel disponível na MW Consultoria Imobiliária. Não perca!"
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Imóvel ${imageId} - MW Consultoria Imobiliária`} />
        <meta
          property="og:description"
          content="Confira este imóvel disponível na MW Consultoria Imobiliária. Não perca!"
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:url" content={url} />

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

      <main className="container mx-auto mt-12 flex min-h-screen justify-center">
        <Image
          alt={`Imagem do imóvel ${imageId}`}
          title={`Imagem do imóvel ${imageId}`}
          className="mb-12 rounded-3xl"
          src={imageUrl}
          width={384}
          height={384}
          placeholder="blur"
          priority
        />
      </main>
    </>
  );
};

export default ImageIdPage;

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
