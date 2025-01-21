/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 20%;
  padding: 84px 190px 84px 190px;
  border-radius: 15px;
  border: 5px solid var(--color-blue-light);
  background: #03122f;
  flex-shrink: 0;
`;

const ModalHeader = styled.h2`
  margin-bottom: 16px;
  color: var(--color-blue);
  font-family: Roboto;
  font-size: 60px;
  font-weight: 900;
  text-transform: uppercase;
  padding-bottom: 40px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  font-family: "Source Sans Pro";
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-transform: capitalize;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 35px;
`;

const ModalInput = styled.input`
  padding: 15px;
  border-radius: 4px;
  border-radius: 10px;
  border: 3px solid var(--color-blue);
  background-color: #03122f;
  color: #A5A5A5;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  width: 180px;
  height: 54px;
  padding: 8px 16px;
  margin-top: 25px;
  border-radius: 10px;
  border: 3px solid;
  cursor: pointer;
  color: ${({ variant }) =>
    variant === "cancel" ? "var(--color-gray)" : "var(--color-blue)"};
  background: ${({ variant }) =>
    variant === "cancel" ? "none" : "rgba(0, 0, 0, 0.90)"};
  border-color: ${({ variant }) =>
    variant === "cancel"
      ? "var(--color-gray-light, #F5F5F5)"
      : "var(--Blue, #2271D1)"};
  box-shadow: ${({ variant }) =>
    variant === "cancel" ? "none" : "0px 0px 12px 4px #2271D1 inset"};
`;

const Modal = ({ isOpen, onClose, cardData, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    videoLink: "",
  });

  useEffect(() => {
    if (cardData) {
      setFormData({
        title: cardData.title || "",
        image: cardData.image || "",
        videoLink: cardData.videoLink || "",
      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <ModalWrapper $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Editar Card</ModalHeader>
        <ModalForm onSubmit={handleSubmit}>
          <FormGroup>
            <label>Titulo</label>
            <ModalInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Link da Imagem</label>
            <ModalInput
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Link do Vídeo</label>
            <ModalInput
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
            />
          </FormGroup>
          <ModalButtonGroup>
            <ModalButton variant="save" type="submit">
              Salvar
            </ModalButton>
            <ModalButton type="button" variant="cancel" onClick={onClose}>
              Cancelar
            </ModalButton>
          </ModalButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
