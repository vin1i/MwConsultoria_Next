import { AppContextProvider } from "@/context/AppContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Global from "@/styles/Global";
import "./styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <LoadingProvider>
        <Global />
        <Component {...pageProps} />
      </LoadingProvider>
    </AppContextProvider>
  );
}
