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
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const ModalHeader = styled.h2`
  margin-bottom: 16px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalTextarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#f44336" : "#4caf50"};
  color: white;
`;

const Modal = ({ isOpen, onClose, cardData, onSave }) => {
  console.log("Modal está sendo renderizado:", isOpen, cardData);

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
          <label>Título</label>
          <ModalInput
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label>Link da Imagem</label>
          <ModalInput
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <label>Link do Vídeo</label>
          <ModalInput
            type="text"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
          />
          <ModalButtonGroup>
            <ModalButton type="button" variant="cancel" onClick={onClose}>
              Cancelar
            </ModalButton>
            <ModalButton type="submit">Salvar</ModalButton>
          </ModalButtonGroup>
        </ModalForm>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
