/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";
import DividerComponent from "../Divider";

const FormContainer = styled.div`
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 12.5rem 4rem 12.5rem;
  border: 3px solid var(--color-white);
  padding: 2rem;
`;

const FormTitle = styled.h1`
  color: var(--color-white);
  font-family: "Source Sans Pro";
  font-size: 1.5rem;
  font-weight: 600;
`;

const Forms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.25rem;
  border-radius: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  flex: 1;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  color: var(--color-white);
  flex: 0.5;
  font-family: "Source Sans Pro";
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5rem;
  text-transform: capitalize;
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
`;

const SaveButton = styled.button`
  width: 180px;
  padding: 0.625rem;
  border-radius: 0.625rem;
  border: 3px solid var(--color-blue);
  background: none;
  color: var(--color-white);
  cursor: pointer;
  font-family: Roboto;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const ClearButton = styled.button`
  width: 180px;
  padding: 0.625rem;
  border-radius: 0.625rem;
  border: 2px solid var(--color-gray);
  background: none;
  color: var(--color-white);
  cursor: pointer;
  font-family: Roboto;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Form = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    videoLink: "",
    description: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      category: "",
      image: "",
      videoLink: "",
      description: "",
    });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      category: "",
      image: "",
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
              <option value="FRONT END">Front End</option>
              <option value="BACK END">Back End</option>
              <option value="MOBILE">Mobile</option>
            </Select>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <label>Imagem</label>
            <FormInput
              type="text"
              name="image"
              value={formData.image}
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
          <SaveButton $variant="save" type="submit">
            Salvar
          </SaveButton>
          <ClearButton type="button" $variant="limpar" onClick={handleClear}>
            Limpar
          </ClearButton>
        </ButtonGroup>
      </Forms>
    </FormContainer>
  );
};

export default Form;
