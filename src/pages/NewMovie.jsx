import styled from "styled-components";
import TitleComponent from "../components/Title";
import Form from "../components/Form";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: flex;

  @media (max-width: 430px) {
    margin-inline: 1rem;
  }
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
      <Section>
        <Form onSave={handleSave} />
      </Section>
    </>
  );
};

export default NewMovie;
