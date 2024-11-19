import React from 'react';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';

const MessageContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #0078d4;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  transition: opacity 0.3s ease;
`;

const FeedbackMessage = () => {
  const { message } = useFavorites();

  if (!message) return null;

  return <MessageContainer>{message}</MessageContainer>;
};

export default FeedbackMessage;
