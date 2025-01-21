import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";
import Button from "../Button";
import styled from "styled-components";

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  margin-bottom: 40px;
`;

const CardsWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid ${(props) => props.color};
  border-radius: 15px;
  margin: 0 10px;
  flex-shrink: 0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 15px 15px 0 0;
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

const ArrowButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 55%;
  width: 100%;
  z-index: 1;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: var(--color-white);
  cursor: pointer;
  transition: color 0.5s;
`;

const Carousel = ({ category, handleDelete, handleEditClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCategoryColor = () => {
    return category.categoryColor || "#000";
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < category.cards.length - 2 ? prevIndex + 2 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 2 : prevIndex));
  };

  return (
    <CarouselContainer>
      <h2>{category.category}</h2>
      <ArrowButtonContainer>
        <ArrowButton $left onClick={handlePrev}>
          <FaChevronLeft />
        </ArrowButton>
        <ArrowButton onClick={handleNext}>
          <FaChevronRight />
        </ArrowButton>
      </ArrowButtonContainer>

      <CardsWrapper>
        {category.cards.slice(currentIndex, currentIndex + 2).map((card) => (
          <Card key={card.id} color={getCategoryColor(category.category)}>
            <CardImage
              src={card.image}
              onClick={() => window.open(card.videoLink, "_blank")}
            />
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
          </Card>
        ))}
      </CardsWrapper>
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        videoLink: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default Carousel;
