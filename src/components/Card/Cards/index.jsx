import { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../Button";
import Modal from "../../Modal";
import Carousel from "../../Carousel";

const CardContainer = styled.section`
  width: 100%;
  overflow-x: hidden;
`;

const CategoryTitleContainer = styled.div`
  width: 432px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${(props) => props.$bgColor || "#6BD1FF"};
  margin: 20px auto;

  @media (max-width: 430px) {
    width: 300px;
    margin: 20px 0px 15px 20px;
  }
`;

const CategoryTitle = styled.h2`
  color: var(--color-white);
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 800;
`;

const ContainerCategories = styled.div`
  display: flex;
  justify-self: flex-start;
  margin: 2rem 0rem 1rem 0rem;

  @media screen and (min-width: 600px) and (max-width: 768px) {
    margin: 2rem 0rem 1rem 2rem;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid ${(props) => props.color};
  border-radius: 15px;
  margin: 0 10px;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 432px;
  cursor: pointer;
  border-radius: 15px 15px 0 0;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  width: 100%;
  height: 59px;
  border-top: 4px solid ${(props) => props.color};
`;

// eslint-disable-next-line no-unused-vars
const Cards = ({ category, setCategories, fetchCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);
  const [cards, setCards] = useState(category.cards);

  const getCategoryColor = () => category.categoryColor || "#6BD1FF";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsCarousel(width <= 1024 && width >= 320);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCards(category.cards); // Atualiza os cards quando a categoria mudar
  }, [category]);

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleSave = async () => {
    try {
      // Atualiza os cards no estado e backend após salvar no modal
      await fetch(`http://localhost:3000/categorias/${category._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      fetchCategories();
      closeModal();
      console.log("Dados atualizados");
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      // Remove o card do estado local antes de atualizar o backend
      const updatedCards = cards.filter((card) => card.id !== cardId);
      setCards(updatedCards);

      await fetch(
        `http://localhost:3000/categorias/${category._id}/cards/${cardId}`,
        {
          method: "DELETE",
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:3000${imagePath}`;
    }
    return imagePath;
  };

  if (!category) return null;
  return (
    <CardContainer>
      <ContainerCategories>
        <CategoryTitleContainer $bgColor={getCategoryColor(category.category)}>
          <CategoryTitle>{category.category}</CategoryTitle>
        </CategoryTitleContainer>
      </ContainerCategories>
      {isCarousel ? (
        <Carousel
          category={category}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {cards &&
            cards.length > 0 &&
            cards.map((card) => (
              <StyledCard
                key={card.id}
                color={getCategoryColor(category.category)}
              >
                <CardImage src={getImageUrl(card.image)} />
                <ButtonContainer color={getCategoryColor(category.category)}>
                  <Button
                    className={"card-button"}
                    onClick={() => handleDelete(card.id)}
                    size="small"
                    icon={IoTrashBinOutline}
                  >
                    Deletar
                  </Button>
                  <Button
                    className={"card-button"}
                    onClick={() => handleEditClick(card)}
                    size="small"
                    icon={RiEditLine}
                  >
                    Editar
                  </Button>
                </ButtonContainer>
              </StyledCard>
            ))}
        </div>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          cardData={selectedCard}
          onSave={handleSave}
        />
      )}
    </CardContainer>
  );
};

Cards.propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string,
    hoverColor: PropTypes.string,
    bgColor: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        videoLink: PropTypes.string,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setCategories: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default Cards;
