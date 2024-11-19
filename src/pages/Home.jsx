import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoStar } from 'react-icons/io5';
import api from '../services/api';
import Filter from '../components/Filter';
import HeroCard from '../components/HeroCard';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #d4d4d4, #9e9e9e);
  font-family: 'Roboto', sans-serif;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
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
  margin-top: 30px;
`;

const FavoritesButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: #000;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #555;
  }

  .icon {
    color: gold;
    font-size: 24px;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const Message = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #e53935;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
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

const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const fetchHeroes = async (page = 0, query = '') => {
    const offset = page * itemsPerPage;
    try {
      const response = await api.get('/characters', {
        params: { limit: itemsPerPage, offset, nameStartsWith: query || undefined },
      });
  
      const results = response.data.data.results.map((hero) => ({
        ...hero,
        isFavorite: favorites.some((fav) => fav.id === hero.id), // Verifica se o herói está nos favoritos
      }));
  
      setHeroes(results);
      setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
      setMessage(results.length === 0 ? 'Nenhum herói encontrado' : '');
    } catch (error) {
      setMessage('Erro ao carregar heróis.');
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchHeroes(0, search);
  };

  const handlePagination = (direction) => {
    const nextPage = currentPage + direction;
    setCurrentPage(nextPage);
    fetchHeroes(nextPage, search);
  };

  const handleFavorite = (hero) => {
    if (hero.isFavorite) {
      // Apenas exibe a mensagem
      setMessage(`${hero.name} já está nos favoritos!`);
    } else {
      // Adiciona aos favoritos
      toggleFavorite(hero);
  
      // Atualiza a lista localmente
      setHeroes((prevHeroes) =>
        prevHeroes.map((h) =>
          h.id === hero.id ? { ...h, isFavorite: true } : h
        )
      );
  
      setMessage(`${hero.name} foi adicionado aos favoritos!`);
    }
  
    // Limpa a mensagem após 3 segundos
    setTimeout(() => setMessage(''), 3000);
  };
  

  const showModal = (description) => {
    setSelectedDescription(description || 'Descrição indisponível.');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDescription('');
  };

  useEffect(() => {
    fetchHeroes(currentPage, search);
  }, [currentPage]);

  return (
    <Container>
      <FavoritesButton onClick={() => navigate('/favorites')}>
        <IoStar className="icon" />
        <span>Meus Favoritos</span>
      </FavoritesButton>
      <Title>Catálogo Super Heróis Marvel</Title>
      <Filter
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <HeroList>
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            isFavorite={hero.isFavorite}
            onFavorite={() => handleFavorite(hero)}
            onShowDescription={() => showModal(hero.description)}
          />
        ))}
      </HeroList>
      {modalVisible && (
        <ModalOverlay>
          <ModalContent>
            <h2>Descrição do Herói</h2>
            <p>{selectedDescription}</p>
            <ModalCloseButton onClick={closeModal}>Fechar</ModalCloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
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
          Próximo
        </PaginationButton>
      </PaginationButtons>
      <Message isVisible={!!message}>{message}</Message>
    </Container>
  );
};

export default Home;
