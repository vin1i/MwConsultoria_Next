import React, { useEffect, useMemo, useState } from "react";
import { getImoveis, deleteImovel } from "../services/propertyService";
import { useLoading } from "../../../context/LoadingContext";
import styled from "styled-components";
import Swal from "sweetalert2";

const generateCloudinaryURL = (imageId) => {
  // Verifica se a URL já está completa
  if (imageId.startsWith("http") && imageId.includes("res.cloudinary.com")) {
    return imageId;
  }

  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${imageId}`;
};
const PropertyList = ({ onEdit, onDelete }) => {
  const [properties, setProperties] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true);
      try {
        const data = await getImoveis();

        const formattedProperties = data.map((property) => ({
          ...property,
          valorVenda: parseFloat(property.valorVenda) || null,
          valorLocacao: parseFloat(property.valorLocacao) || null,
          vlCondominio: parseFloat(property.vlCondominio) || null,
          vlIptu: parseFloat(property.vlIptu) || null,
        }));

        setProperties(formattedProperties);
      } catch (error) {
        console.error("Erro ao carregar propriedades:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProperties();
  }, [setIsLoading]);

  const formatCurrency = (value) =>
    value !== null && value !== undefined
      ? `R$ ${parseFloat(value).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "Não disponível";

  const availableProperties = properties.filter(
    (property) => property.disponibilidade !== "Indisponível"
  );

  const confirmDelete = async (id) => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Esta ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await deleteImovel(id);
        setProperties((prev) => prev.filter((property) => property.id !== id));
        Swal.fire({
          title: "Excluído!",
          text: "O imóvel foi excluído com sucesso.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Erro ao deletar imóvel:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível excluir o imóvel. Tente novamente.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return properties.slice(startIndex, startIndex + itemsPerPage);
  }, [properties, currentPage]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  return (
    <Container>
      {isLoading ? (
        <LoadingMessage>
          <span role="img" aria-label="Carregando">
            ⏳
          </span>{" "}
          Carregando propriedades...
        </LoadingMessage>
      ) : properties.length > 0 ? (
        <Grid>
          {paginatedProperties.map((property) => (
            <Card key={property.id}>
              {property.imagens && property.imagens.length > 0 ? (
                <img
                  src={property.imagens[0]} // Mostra a primeira imagem do array normalizado
                  alt={`Imagem do imóvel: ${property.titulo}`}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/300x200?text=Sem+Imagem"
                  alt="Sem imagem disponível"
                />
              )}
              <Title>{property.titulo || "Sem título"}</Title>
              <Details>
                <p>
                  <strong>Endereço:</strong>{" "}
                  {property.endereco || "Não informado"}
                </p>
                <p>
                  <strong>Valor Venda:</strong>{" "}
                  {formatCurrency(property.valorVenda)}
                </p>
                <p>
                  <strong>Valor Locação:</strong>{" "}
                  {formatCurrency(property.valorLocacao)}
                </p>
                <p>
                  <strong>Condomínio:</strong>{" "}
                  {formatCurrency(property.vlCondominio)}
                </p>
                <p>
                  <strong>IPTU:</strong> {formatCurrency(property.vlIptu)}
                </p>
                <p>
                  <strong>Disponibilidade:</strong>{" "}
                  {property.disponibilidade || "Não informado"}
                </p>
                <p>
                  <strong>Metragem:</strong>{" "}
                  {property.metrosQuadrados || "Não informado"} m²
                </p>
                <p>
                  <strong>Quartos:</strong>{" "}
                  {property.quartos || "Não informado"}
                </p>
                <p>
                  <strong>Suítes:</strong> {property.suites || "Não informado"}
                </p>
                <p>
                  <strong>Banheiros:</strong>{" "}
                  {property.banheiros || "Não informado"}
                </p>

                <p>
                  <strong>Vagas:</strong> {property.vagas || "Não informado"}
                </p>

                <p>
                  <strong>Descrição:</strong>{" "}
                  {property.descricao || "Não informada"}
                </p>
              </Details>
              <ButtonContainer>
                <ActionButton
                  onClick={() => {
                    onEdit(property);
                  }}
                >
                  Editar
                </ActionButton>
                <ActionButton onClick={() => confirmDelete(property.id)}>
                  Excluir
                </ActionButton>
              </ButtonContainer>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyMessage>
          <span role="img" aria-label="Nenhuma propriedade">
            🏠
          </span>{" "}
          Nenhuma propriedade encontrada.
        </EmptyMessage>
      )}
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            $active={currentPage === index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default PropertyList;

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const Details = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
  color: #555;

  p {
    margin-bottom: 8px;
    color: #333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: var(--red);
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-red);
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #333;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? "var(--red)" : "#ddd")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: var(--red);
    color: #fff;
  }
`;
