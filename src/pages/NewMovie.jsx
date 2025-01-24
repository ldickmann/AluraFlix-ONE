import styled from "styled-components";
import TitleComponent from "../components/Title";
import Form from "../components/Form";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewMovie = () => {
  const handleSave = async (data) => {
    try {
      console.log("Dados enviados:", data);
      console.log("Card adicionado!");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <>
      <Header>
        <TitleComponent>Novo Vídeo</TitleComponent>
      </Header>
      <Form onSave={handleSave} />
    </>
  );
};

export default NewMovie;
