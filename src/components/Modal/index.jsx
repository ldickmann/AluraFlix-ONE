/* eslint-disable react/prop-types */
import { RiCloseCircleLine } from "react-icons/ri";
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
  height: 80%;
  padding: 64px 150px 64px 150px;
  border-radius: 15px;
  border: 5px solid var(--color-blue-light);
  background: #03122f;
  flex-shrink: 0;

  @media (max-width: 430px) {
    width: 90%;
    height: 90%;
    padding: 0 0 0 0;
  }
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-white);

  @media (max-width: 430px) {
    padding: 25px 25px;
  }
`;

const ModalHeader = styled.h2`
  margin-bottom: 16px;
  color: var(--color-blue);
  font-family: var(--font-one);
  font-size: 45px;
  font-weight: 900;
  text-transform: uppercase;
  padding-bottom: 15px;

  @media (max-width: 430px) {
    font-size: 20px;
    margin-bottom: 0px;
    padding-left: 25px;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  font-family: var(--font-two);
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  text-transform: capitalize;

  @media (max-width: 430px) {
    padding: 0 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;

  @media (max-width: 430px) {
    gap: 5px;
  }
`;

const ModalInput = styled.input`
  padding: 15px;
  border-radius: 4px;
  border-radius: 10px;
  border: 3px solid var(--color-blue);
  background-color: #03122f;
  color: var(--color-gray-light);
`;

const Select = styled.select`
  padding: 15px;
  border-radius: 4px;
  border-radius: 10px;
  border: 3px solid var(--color-blue);
  background-color: #03122f;
  color: var(--color-gray-light);
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;

  @media (max-width: 430px) {
    gap: 5px;
  }
`;

const ModalButton = styled.button`
  width: 180px;
  height: 54px;
  padding: 8px 16px;
  margin-top: 25px;
  border-radius: 10px;
  border: 3px solid;
  cursor: pointer;
  font-family: var(--font-two);
  font-size: 15px;
  text-transform: uppercase;
  color: ${({ $variant }) =>
    $variant === "limpar" ? "var(--color-gray)" : "var(--color-blue)"};
  background: ${({ $variant }) =>
    $variant === "limpar" ? "none" : "rgba(0, 0, 0, 0.90)"};
  border-color: ${({ $variant }) =>
    $variant === "limpar" ? "var(--color-gray-light)" : "var(--color-blue)"};
  box-shadow: ${({ $variant }) =>
    $variant === "limpar" ? "none" : "0px 0px 12px 4px #2271D1 inset"};
`;

const Modal = ({ isOpen, onClose, cardData, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "",
    image: "",
    videoLink: "",
    description: "",
  });

  useEffect(() => {
    if (cardData) {
      setFormData({
        id: cardData.id,
        title: cardData.title || "",
        category: cardData.category || "",
        image: cardData.image || "",
        videoLink: cardData.videoLink || "",
        description: cardData.description || "",
      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/categorias");
      const categories = await response.json();
      const categoryToUpdate = categories.find(
        (cat) => cat.cards && cat.cards.some((card) => card.id === cardData.id)
      );
      if (categoryToUpdate) {
        await fetch(
          `http://localhost:3000/categorias/${categoryToUpdate._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...categoryToUpdate,
              cards: categoryToUpdate.cards.map((card) =>
                card.id === cardData.id
                  ? {
                      ...card,
                      title: formData.title,
                      category: formData.category,
                      image: formData.image,
                      videoLink: formData.videoLink,
                      description: formData.description,
                    }
                  : card
              ),
            }),
          }
        );
        onSave(formData);
        onClose();
        console.log("Dados atualizados");
      } else {
        console.error("Erro: categoria não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao salvar o card no backend:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      id: null,
      title: "",
      category: "",
      image: "",
      videoLink: "",
      description: "",
    });
  };

  return (
    <ModalWrapper $isOpen={isOpen}>
      <ModalContent>
        <CloseIcon onClick={onClose}>
          <RiCloseCircleLine />
        </CloseIcon>
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
            <label>Categoria</label>
            <Select
              type="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="FRONTEND">Front End</option>
              <option value="BACKEND">Back End</option>
              <option value="MOBILE">Mobile</option>
              <option value="INOVAÇÃO">Inovação</option>
              <option value="GESTÃO">Gestão</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <label>Imagem</label>
            <ModalInput
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Vídeo</label>
            <ModalInput
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Descrição</label>
            <ModalInput
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <ModalButtonGroup>
            <ModalButton $variant="save" type="submit">
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

export default Modal;
