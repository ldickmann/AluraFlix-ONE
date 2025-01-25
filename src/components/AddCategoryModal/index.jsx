import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 50%;
  padding: 2rem;
  border-radius: 15px;
  border: 5px solid var(--color-blue-light);
  background: var(--color-black);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-white);
`;

const ModalHeader = styled.h2`
  color: var(--color-blue);
  font-family: var(--font-one);
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-white);
  font-family: var(--font-two);
  font-size: 1rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const ModalInput = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 3px solid var(--color-blue);
  background-color: #03122f;
  color: var(--color-gray-light);

  &[type="color"] {
    padding: 0.5rem;
    height: 3rem;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const ModalButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 3px solid var(--color-blue);
  cursor: pointer;
  font-family: var(--font-two);
  font-size: 1rem;
  text-transform: uppercase;
  color: ${({ $variant }) =>
    $variant === "limpar" ? "var(--color-gray)" : "var(--color-blue)"};
  background: ${({ $variant }) =>
    $variant === "limpar" ? "none" : "rgba(0, 0, 0, 0.90)"};
  box-shadow: ${({ $variant }) =>
    $variant === "limpar" ? "none" : "0px 0px 12px 4px #2271D1 inset"};
`;

const AddCategoryModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    category: "",
    categoryColor: "#000000",
    hoverColor: "#000000",
    bgColor: "#000000",
    cards: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  const handleClear = () => {
    setFormData({
      category: "",
      categoryColor: "#000000",
      hoverColor: "#000000",
      bgColor: "#000000",
      cards: [],
    });
  };

  return (
    <ModalWrapper $isOpen={isOpen}>
      <ModalContent>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <ModalHeader>Adicionar Categoria</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Categoria</label>
            <ModalInput
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Categoria"
            />
          </FormGroup>
          <FormGroup>
            <label>Cor da Categoria</label>
            <ModalInput
              type="color"
              name="categoryColor"
              value={formData.categoryColor}
              onChange={handleChange}
              placeholder="Cor da Categoria"
            />
          </FormGroup>
          <FormGroup>
            <label>Cor de Hover</label>
            <ModalInput
              type="color"
              name="hoverColor"
              value={formData.hoverColor}
              onChange={handleChange}
              placeholder="Cor de Hover"
            />
          </FormGroup>
          <FormGroup>
            <label>Cor de Fundo</label>
            <ModalInput
              type="color"
              name="bgColor"
              value={formData.bgColor}
              onChange={handleChange}
              placeholder="Cor de Fundo"
            />
          </FormGroup>
          <ModalButtonGroup>
            <ModalButton type="submit" $variant="salvar" size="medium">
              Salvar
            </ModalButton>
            <ModalButton type="button" $variant="limpar" onClick={handleClear}>
              Limpar
            </ModalButton>
          </ModalButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalWrapper>
  );
};

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddCategoryModal;
