import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (hero) => {
    const isFavorite = favorites.some((fav) => fav.id === hero.id);
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== hero.id) // Remove se já estiver
      : [...favorites, hero]; // Adiciona se não estiver
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
