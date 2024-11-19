import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border-color: #e53935;
  }
`;

const SearchButton = styled.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #b71c1c;
  }
`;

const Filter = ({ searchValue, onSearchChange, onSearch, onKeyDown }) => {
  return (
    <FilterContainer>
      <SearchInput
        type="text"
        placeholder="Buscar herói..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <SearchButton onClick={onSearch}>
        <FaSearch />
      </SearchButton>
    </FilterContainer>
  );
};

export default Filter;
