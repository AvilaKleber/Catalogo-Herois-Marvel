import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteHeroCard from '../components/FavoriteHeroCard';
import { IoArrowBackCircle } from 'react-icons/io5';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #d4d4d4, #9e9e9e);
  font-family: 'Roboto', sans-serif;
  position: relative;
`;

const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 46px;
  color: #e53935;
  cursor: pointer;

  &:hover {
    color: #b71c1c;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const HeroList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  justify-items: center;
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #b71c1c;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  background: #e53935;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #b71c1c;
  }
`;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const paginatedFavorites = favorites.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleRemoveFavorite = (hero) => {
    toggleFavorite(hero);
  };

  const showModal = (description) => {
    setSelectedDescription(description || 'Descrição indisponível.');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDescription('');
  };

  const handlePagination = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <IoArrowBackCircle />
      </BackButton>
      <Title>Meus Heróis Favoritos</Title>
      {paginatedFavorites.length > 0 ? (
        <HeroList>
          {paginatedFavorites.map((hero) => (
            <FavoriteHeroCard
              key={hero.id}
              hero={hero}
              onRemove={handleRemoveFavorite}
              onShowDescription={() => showModal(hero.description)}
            />
          ))}
        </HeroList>
      ) : (
        <p>Você ainda não adicionou nenhum herói aos favoritos.</p>
      )}
      {modalVisible && (
        <ModalOverlay>
          <ModalContent>
            <h2>Descrição do Herói</h2>
            <p>{selectedDescription}</p>
            <ModalCloseButton onClick={closeModal}>Fechar</ModalCloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
      {favorites.length > itemsPerPage && (
        <PaginationButtons>
          <PaginationButton
            disabled={currentPage === 0}
            onClick={() => handlePagination(-1)}
          >
            Anterior
          </PaginationButton>
          <PaginationButton
            disabled={currentPage + 1 >= totalPages}
            onClick={() => handlePagination(1)}
          >
            Próxima
          </PaginationButton>
        </PaginationButtons>
      )}
    </Container>
  );
};

export default FavoritesPage;
