import { AppContextProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import { ToastProvider } from "@/hooks/useToast"; // Importe o ToastProvider
import Global from "@/styles/Global";
import "./styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <LoadingProvider>
        <ToastProvider> {/* Adicionado aqui */}
          <Global />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ToastProvider>
      </LoadingProvider>
    </AppContextProvider>
  );
}
