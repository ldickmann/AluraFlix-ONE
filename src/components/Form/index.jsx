import styled from "styled-components";
import { useState } from "react";
import DividerComponent from "../Divider";
import Button from "../Button";

const FormContainer = styled.div`
  max-width: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid var(--color-white);
  padding: 2rem;
  flex: 0.5%;
  margin: 3rem auto;

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
    id: "",
    title: "",
    category: "",
    image: null,
    videoLink: "",
    description: "",
  });

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
        console.error("Erro ao adicionar card:", response.statusText);
      }
    }

    setFormData({
      id: "",
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
              <option value="FRONTEND">Front End</option>
              <option value="BACKEND">Back End</option>
              <option value="MOBILE">Mobile</option>
              <option value="INOVAÇÃO">Inovação</option>
              <option value="GESTÃO">Gestão</option>
            </Select>
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
    </FormContainer>
  );
};

export default Form;
