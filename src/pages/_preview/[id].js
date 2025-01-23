import { getImovelById } from "../../services/firebase/firestoreService"; 
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ImovelPreview({ title, description, image, appPath }) {
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    if (!query.from_landing) {
      router.push({ pathname: appPath, query: { from_landing: true } });
    }
  }, [router]);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={`https://mwconsultoriaimobiliaria.com.br${appPath}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`https://mwconsultoriaimobiliaria.com.br${appPath}`} />
    </Head>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const data = await getImovelById(id);
    if (!data) {
      return { notFound: true }; 
    }

    const placeholderImage = "https://mwconsultoriaimobiliaria.com.br/default-image.jpg";

    // Função para validar URLs
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    };

    // Verifica a primeira imagem válida e aplica transformações no Cloudinary
    const validImage = data.imagens?.find((img) => isValidUrl(img)) || placeholderImage;

    // Transformação no Cloudinary para redimensionar e ajustar imagens maiores
    const imageUrl = validImage.includes("cloudinary.com")
      ? validImage.replace("upload/", "upload/w_1200,h_630,c_limit,f_auto/")
      : validImage;

    return {
      props: {
        title: data.nm_titulo || "Imóvel Disponível",
        description: data.ds_descricao || "Veja os detalhes deste imóvel incrível!",
        image: imageUrl,
        appPath: `/imoveis/${id}`,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
    return { notFound: true };
  }
}
