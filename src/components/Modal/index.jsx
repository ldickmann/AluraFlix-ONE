import { RiCloseCircleLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categorias");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

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
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardId = cardData.id;
    const categoryId = cardData.id;

    try {
      const response = await fetch(
        `http://localhost:3000/categorias/${categoryId}/cards/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        onSave(formData);
        onClose();
      } else {
        console.error("Erro ao atualizar dados:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      _id: null,
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
            <label>Título</label>
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
              name="category"
              value={formData.category}
              onChange={(e) => {
                const selectedCategory = categories.find(
                  (category) => category.category === e.target.value
                );
                setFormData((prevData) => ({
                  ...prevData,
                  category: e.target.value,
                  categoryId: selectedCategory ? selectedCategory._id : "",
                }));
              }}
            >
              <option value="">Selecione a Categoria</option>
              {categories.map((category) => (
                <option key={category._id} value={category.category}>
                  {category.category}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <label>Imagem</label>
            <ModalInput type="file" name="image" onChange={handleChange} />
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
            <ModalButton type="submit" $variant="salvar">
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cardData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    videoLink: PropTypes.string,
    description: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
};

export default Modal;
