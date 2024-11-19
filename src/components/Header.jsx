import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeart, FaBars } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #0078d4, #005bb5);
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 15px;

  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .favorites {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    svg {
      font-size: 24px;
      margin-right: 5px;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      background: red;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
`;

const Header = ({ favoritesCount }) => {
  return (
    <HeaderContainer>
      <Title>Catálogo de Super Heróis</Title>
      <Nav>
        <Link to="/favorites" className="favorites">
          <FaHeart />
          {favoritesCount > 0 && <span>{favoritesCount}</span>}
        </Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
