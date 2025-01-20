import { AppContextProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Global from "@/styles/Global";
import "./styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <LoadingProvider>
        <Global />
        <Header/> 
        <Component {...pageProps} />
        <Footer/>
      </LoadingProvider>
    </AppContextProvider>
  );
}
