/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const FormButton = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: Roboto;
  font-size: 20px;
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
    <Container>
      <Forms onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Selecione a Categoria</option>
          <option value="FRONT END">Front End</option>
          <option value="BACK END">Back End</option>
          <option value="MOBILE">Mobile</option>
        </select>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Imagem"
        />
        <input
          type="text"
          name="videoLink"
          value={formData.videoLink}
          onChange={handleChange}
          placeholder="Link do Vídeo"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <ButtonGroup>
          <FormButton $variant="save" type="submit">
            Salvar
          </FormButton>
          <FormButton type="button" $variant="limpar" onClick={handleClear}>
            Limpar
          </FormButton>
        </ButtonGroup>
      </Forms>
    </Container>
  );
};

export default Form;
