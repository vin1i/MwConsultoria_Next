import { AppContextProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Global from "@/styles/Global";
import "@/styles/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <LoadingProvider>
  
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#a51c30" />
            <meta name="author" content="MW Consultoria" />
            <meta
              name="description"
              content="MW Consultoria Imobiliária: Consultoria especializada em imóveis com foco em venda, locação e gestão imobiliária."
            />
            <meta
              name="keywords"
              content="consultoria, imobiliária, imóveis, venda, locação, gestão, MW Consultoria"
            />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Portuguese" />
            <meta property="og:title" content="MW Consultoria Imobiliária" />
            <meta
              property="og:description"
              content="MW Consultoria Imobiliária: Encontre o imóvel perfeito para você com a nossa consultoria especializada."
            />
            <meta
              property="og:image"
              content="/default-share-image.jpg" 
            />
            <meta property="og:url" content="https://cfc8-2804-5180-2305-21dc-d957-b9ab-f5a8-1902.ngrok-free.app/" />
            <meta property="og:type" content="website" />
            
            {/* Ícones */}
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="192x192"
              href="/android-chrome-192x192.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="512x512"
              href="/android-chrome-512x512.png"
            />
            <link rel="manifest" href="/manifest.json" />

   

            <title>MW Consultoria Imobiliária</title>
          </Head>
          <Global />
          <Header />
          <Component {...pageProps} />
          <Footer />
       
      </LoadingProvider>
    </AppContextProvider>
  );
}
