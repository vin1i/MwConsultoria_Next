import React, { useState, useEffect } from "react";
import PropertyList from "../components/PropertyList";
import PropertyForm from "../components/PropertyForm.js";
import {
  getImoveis,
  addProperty,
  updateImovel,
  deleteImovel,
} from "../../../services/propertyService";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AppContext";
import CadastroImovel from "../components/CadastroImovel";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
  color: var(--red);
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: var(--red);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--black);
`;

function PropertyPage() {
  const { isAuthenticated, user } = useAuth(); // Verifica se o usuário está autenticado
  const router = useRouter();
  const [imoveis, setImoveis] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("Usuário logado:", user);
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetchProperties();
    }
  }, [isAuthenticated]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const data = await getImoveis();
      setImoveis(data);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (newProperty) => {
    try {
      await addProperty(newProperty);
      toast.success("Imóvel cadastrado com sucesso!", { autoClose: 8000 });

      setTimeout(() => {
        fetchProperties();
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao adicionar imóvel:", error);
      toast.error("Erro ao cadastrar o imóvel. Tente novamente.", {
        autoClose: 10000,
      });
    }
  };

  const handleEdit = async (updatedProperty) => {
    try {
      await updateImovel(selectedProperty.id, updatedProperty);
      fetchProperties();
      setSelectedProperty(null);
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao editar imóvel:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImovel(id);
      fetchProperties();
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
    }
  };

  if (!isAuthenticated) {
    return <Message>Redirecionando para o login...</Message>;
  }

  return (
    <Container>
      <Header>Gerenciamento de Imóveis</Header>
      <Button onClick={() => setShowForm(true)}>Adicionar Imóvel</Button>
      {showForm && (
        <CadastroImovel
          existingProperty={selectedProperty}
          onSave={(updatedProperty) => {
            selectedProperty
              ? handleEdit(updatedProperty)
              : handleAdd(updatedProperty);
          }}
          onCancel={() => {
            setShowForm(false);
            setSelectedProperty(null);
          }}
        />
      )}
      {isLoading ? (
        <Message>Carregando imóveis...</Message>
      ) : imoveis.length > 0 ? (
        <PropertyList
          properties={imoveis}
          onEdit={(property) => {
            setSelectedProperty(property);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      ) : (
        <Message>Nenhum imóvel encontrado.</Message>
      )}
    </Container>
  );
}

export default PropertyPage;
