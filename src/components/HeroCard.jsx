import React from 'react';
import styled from 'styled-components';
import { IoStar } from 'react-icons/io5';

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: relative;
  border: ${({ isFavorite }) => (isFavorite ? '3px solid gold' : 'none')};
  transition: transform 0.3s ease, border 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
`;

const FavoriteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: ${({ isFavorite }) => (isFavorite ? 'gold' : '#ccc')};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

const HeroCard = ({ hero, isFavorite, onFavorite, onShowDescription }) => (
  <Card isFavorite={isFavorite}>
    <FavoriteIcon
      isFavorite={isFavorite}
      onClick={(e) => {
        e.stopPropagation();
        onFavorite(hero);
      }}
    >
      <IoStar />
    </FavoriteIcon>
    <Thumbnail
      src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
      alt={hero.name}
    />
    <Name>{hero.name}</Name>
    <a
      onClick={(e) => {
        e.stopPropagation();
        onShowDescription();
      }}
      style={{ color: '#e53935', textDecoration: 'underline', cursor: 'pointer' }}
    >
      Ver Descrição
    </a>
  </Card>
);

export default HeroCard;
