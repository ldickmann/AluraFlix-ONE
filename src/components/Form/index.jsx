import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DividerComponent from "../Divider";
import Button from "../Button";
import AddCategoryModal from "../AddCategoryModal";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid var(--color-white);
  padding: 2rem;
  margin: 3rem 12rem;

  @media (max-width: 778px) {
    margin: 3rem 5rem;
  }

  @media (max-width: 430px) {
    border: none;
    padding: 0rem;
  }
`;

const FormTitle = styled.h1`
  color: var(--color-white);
  font-family: var(--font-two);
  font-size: 1.5rem;
  font-weight: 600;
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem;
  border-radius: 4px;

  @media (max-width: 430px) {
    padding: 0rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  flex: 1;

  @media (max-width: 430px) {
    display: block;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  color: var(--color-white);
  flex: 0.5;
  font-family: var(--font-two);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  text-transform: capitalize;

  @media (max-width: 430px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const FormInput = styled.input`
  color: var(--color-gray-light);
  padding: 0.625rem;
  border-radius: 4px;
  border: 3px solid var(--color-dark);
  background: #191919;
  flex: 1;
`;

const Select = styled.select`
  color: var(--color-gray-light);
  padding: 0.625rem;
  border-radius: 4px;
  border: 3px solid var(--color-dark);
  background: #191919;
  flex: 1;
`;

const TextArea = styled.textarea`
  color: var(--color-gray-light);
  padding: 0.625rem;
  border-radius: 4px;
  border: 3px solid var(--color-dark);
  background: #191919;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.625rem;
  margin: 2rem 0rem 4rem 0rem;

  @media (max-width: 430px) {
    justify-content: center;
    align-items: center;
  }
`;

const Form = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
    videoLink: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    setFormData({
      ...formData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/categorias");
    const categories = await response.json();

    const selectedCategory = categories.find(
      (category) => category.category === formData.category
    );

    if (selectedCategory) {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("videoLink", formData.videoLink);
      formDataToSend.append("description", formData.description);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetch(
        `http://localhost:3000/categorias/${selectedCategory._id}/cards`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (response.ok) {
        const updatedCategory = await response.json();
        onSave(updatedCategory);
      } else {
        const errorData = await response.json();
        console.error(
          "Erro ao adicionar card:",
          errorData?.message || response.statusText
        );
      }
    }

    setFormData({
      title: "",
      category: "",
      image: null,
      videoLink: "",
      description: "",
    });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      category: "",
      image: null,
      videoLink: "",
      description: "",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCategory = async (newCategory) => {
    try {
      const response = await fetch("http://localhost:3000/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        handleCloseModal();
      } else {
        console.error("Erro ao adicionar categoria:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  };

  return (
    <FormContainer>
      <Forms onSubmit={handleSubmit}>
        <DividerComponent />
        <FormTitle>Criar Card</FormTitle>
        <DividerComponent />
        <FormGroup>
          <InputGroup>
            <label>Titulo</label>
            <FormInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
            ></FormInput>
          </InputGroup>
          <InputGroup>
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
            <Button type="button" onClick={handleOpenModal} size="long">
              Adicionar Categoria
            </Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <label>Imagem</label>
            <FormInput
              type="file"
              name="image"
              onChange={handleChange}
              placeholder="Imagem"
            ></FormInput>
          </InputGroup>
          <InputGroup>
            <label>Link do Vídeo</label>
            <FormInput
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              placeholder="Link do Vídeo"
            ></FormInput>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <label>Descrição</label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição"
            ></TextArea>
          </InputGroup>
        </FormGroup>
        <ButtonGroup>
          <Button $variant="save" type="submit">
            Salvar
          </Button>
          <Button type="button" $variant="limpar" onClick={handleClear}>
            Limpar
          </Button>
        </ButtonGroup>
      </Forms>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
      />
    </FormContainer>
  );
};

Form.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Form;
