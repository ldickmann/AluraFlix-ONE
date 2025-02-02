import { useEffect, useState } from "react";
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

  @media (max-width: 1024px) {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease;
  padding-left: ${(props) => (props.$isSmallScreen ? "5rem" : "0")};
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* @media (max-width: 430px) {
    flex-shrink: 0;
    width: 100%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: flex-start;
  } */
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid ${(props) => props.color};
  border-radius: 15px;
  margin: 0 10px;
  flex-shrink: 0;
  scroll-snap-align: start;
  width: 100%;

  @media (max-width: 1024px) {
    width: calc(70% - 100px);
  }

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${(props) => (props.$isSmallScreen ? "auto" : "200px")};
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
  top: 50%;
  width: 100%;
  z-index: 1;

  @media (max-width: 430px) {
    display: block;
    margin-left: -1rem;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  color: var(--color-white);
  cursor: pointer;
  transition: color 0.5s;

  @media (max-width: 1024px) {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
  }
`;

const Carousel = ({ category, handleDelete, handleEditClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth < 1024 || window.innerWidth > 400
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCategoryColor = () => {
    return category.categoryColor || "#000";
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < category.cards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const getVisibleCards = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 430) {
      return category.cards.slice(currentIndex, currentIndex + 1);
    } else if (screenWidth < 768) {
      return category.cards.slice(currentIndex, currentIndex + 2);
    } else {
      return category.cards.slice(currentIndex, currentIndex + 3);
    }
  };

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:3000${imagePath}`;
    }
    return imagePath;
  };

  return (
    <CarouselContainer>
      <CardsWrapper $isSmallScreen={isSmallScreen}>
        {isSmallScreen && (
          <ArrowButtonContainer>
            <ArrowButton $left onClick={handlePrev}>
              <FaChevronLeft />
            </ArrowButton>
            <ArrowButton onClick={handleNext}>
              <FaChevronRight />
            </ArrowButton>
          </ArrowButtonContainer>
        )}
        {getVisibleCards().map((card) => (
          <Card
            key={card._id}
            color={getCategoryColor(category.category)}
            $isSmallScreen={isSmallScreen}
          >
            <CardImage
              src={getImageUrl(card.image)}
              $isSmallScreen={isSmallScreen}
            />
            <ButtonContainer color={getCategoryColor(category.category)}>
              <Button
                className={"card-button"}
                onClick={() => handleDelete(card._id)}
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
        _id: PropTypes.string.isRequired,
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
