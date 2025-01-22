import styled from "styled-components";

export const SortableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px dashed #ccc;
  border-radius: 8px;
`;

export const SortableItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }

  &:hover {
    border-color: #007bff;
    cursor: grab;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;
