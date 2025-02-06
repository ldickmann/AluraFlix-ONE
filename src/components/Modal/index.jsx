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
    padding: 0;
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
  border-radius: 10px;
  border: 3px solid var(--color-blue);
  background-color: #03122f;
  color: var(--color-gray-light);
`;

const Select = styled.select`
  padding: 15px;
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
    title: "",
    category: "",
    categoryId: "",
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
        _id: cardData._id || "",
        title: cardData.title || "",
        category: cardData.category || "",
        categoryId: cardData.categoryId || "",
        image: cardData.image || "",
        videoLink: cardData.videoLink || "",
        description: cardData.description || "",
      });
    }
  }, [cardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.category === value
      );

      setFormData((prevData) => ({
        ...prevData,
        category: value,
        categoryId: selectedCategory ? selectedCategory._id : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files ? e.target.files[0] : value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("videoLink", formData.videoLink);

      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // Use the moveCardToCategory endpoint
      const response = await fetch(
        `http://localhost:3000/categorias/${cardData.categoryId}/move-card/${cardData._id}/to/${formData.categoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Card movido com sucesso:", data);
      onSave(data);
      onClose();
    } catch (error) {
      console.error("Erro ao mover o card:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      category: "",
      categoryId: "",
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
              onChange={handleChange}
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
    _id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    categoryId: PropTypes.string,
    image: PropTypes.string,
    videoLink: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
