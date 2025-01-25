import TitleComponent from "../components/Title";
import Form from "../components/Form";

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
      <TitleComponent>Novo Vídeo</TitleComponent>
      <Form onSave={handleSave} />
    </>
  );
};

export default NewMovie;
