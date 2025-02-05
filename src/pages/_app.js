import { AppContextProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Global from "@/styles/Global";
import "@/styles/Globals.css";


import Footer from "@/components/Footer";
import Head from "next/head";
import Header from "@/components/Header/index";


export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <LoadingProvider>
      <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Global />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </LoadingProvider>
    </AppContextProvider>
  );
}
