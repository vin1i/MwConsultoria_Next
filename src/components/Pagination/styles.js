import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
    margin: 10px 0;
  }
`;

export const PageButton = styled.button`
  margin: 0;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? "var(--red)" : "var(--grey)")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#333")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled, $isActive }) =>
      !disabled ? ($isActive ? "var(--dark-red)" : "#ccc") : "#ddd"};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
    min-width: 36px;
    text-align: center;
  }
`;

