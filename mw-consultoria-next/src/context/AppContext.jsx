import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../services/firebase/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setLocalStorage, getLocalStorage } from "./utils";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Função para buscar imóveis
  async function getImoveis() {
    setLoading(true);
    const cachedImoveis = getLocalStorage("imoveis");

    if (cachedImoveis) {
      setImoveis(cachedImoveis);
      setLoading(false);
    } else {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setImoveis(response.data);
        setLocalStorage("imoveis", response.data);
        setError(null);
      } catch (err) {
        setError("Erro ao buscar imóveis");
      } finally {
        setLoading(false);
      }
    }
  }

  // Função para adicionar um novo imóvel
  async function addImovel(novoImovel) {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", novoImovel);
      const newImoveis = [...imoveis, response.data];
      setImoveis(newImoveis);
      setLocalStorage("imoveis", newImoveis);
    } catch (err) {
      setError("Erro ao adicionar imóvel");
    }
  }

  // Função para atualizar um imóvel
  async function updateImovel(id, updatedImovel) {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedImovel);
      const updatedImoveis = imoveis.map((imovel) => (imovel.id === id ? response.data : imovel));
      setImoveis(updatedImoveis);
      setLocalStorage("imoveis", updatedImoveis);
    } catch (err) {
      setError("Erro ao atualizar imóvel");
    }
  }

  // Função para deletar um imóvel
  async function deleteImovel(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedImoveis = imoveis.filter((imovel) => imovel.id !== id);
      setImoveis(updatedImoveis);
      setLocalStorage("imoveis", updatedImoveis);
    } catch (err) {
      setError("Erro ao remover imóvel");
    }
  }

  // Função para realizar login
  async function login(email, password) {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (err) {
      setError("Erro ao realizar login. Verifique suas credenciais.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Função para realizar logout
  async function logout() {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      setError("Erro ao realizar logout. Tente novamente.");
    }
  }

  // Carregar imóveis ao montar o componente
  useEffect(() => {
    getImoveis();
  }, []);

  return (
    <AppContext.Provider
      value={{
        imoveis,
        loading,
        error,
        isAuthenticated,
        user,
        getImoveis,
        addImovel,
        updateImovel,
        deleteImovel,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
