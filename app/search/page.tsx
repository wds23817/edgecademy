'use client';

import React from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';

interface resultProps {
  _id: string;
  home_team: string;
  away_team: string;
  fixture_datetime: string;
}

interface selectedItemProps {
  _id: string;
  fixture_mid: string;
  season: string;
  competition_name: string;
  fixture_datetime: string;
  fixture_round: string;
  home_team: string;
  away_team: string;
}

const Search = () => {
  const [results, setResults] = React.useState<resultProps[]>([]);
  const [keyword, setKeyword] = React.useState<string>('');
  const [selectedItem, setSelectedItem] =
    React.useState<selectedItemProps | null>(null);

  const handleClick = async (id: string) => {
    const res = await fetch(`/api/search/${id}`);
    const data = await res.json();
    setSelectedItem(data);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    if (value.trim() === '') {
      setResults([]);
      return;
    }

    const res = await fetch(`/api/search?keyword=${value}`);
    const data = await res.json();

    if (res.ok) {
      setResults(data);
    } else {
      alert('Error fetching search results');
    }
  };
  return (
    <SearchContainer>
      <h1>Search Page</h1>
      <StyledInput
        type='text'
        value={keyword}
        onChange={handleSearch}
        placeholder='Enter team name'
      ></StyledInput>

      <StyledUl>
        {results.map((result, index) => (
          <StyledLi key={index} onClick={() => handleClick(result._id)}>
            {result.home_team} vs {result.away_team} ({result.fixture_datetime})
          </StyledLi>
        ))}
      </StyledUl>
      {selectedItem && (
        <Modal onClose={() => setSelectedItem(null)}>
          <h2>Match Details</h2>
          <p>Fixture ID: {selectedItem._id}</p>
          <p>Fixture Mid: {selectedItem.fixture_mid}</p>
          <p>Season: {selectedItem.season}</p>
          <p>Competition Name: {selectedItem.competition_name}</p>
          <p>Fixture Datetime: {selectedItem.fixture_datetime}</p>
          <p>Fixture Round: {selectedItem.fixture_round}</p>
          <p>Home Team: {selectedItem.home_team}</p>
          <p>Away Team: {selectedItem.away_team}</p>
        </Modal>
      )}
    </SearchContainer>
  );
};

export default Search;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin: 20px;
  width: 500px;
`;

const SearchContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  color: #333;
  padding-top: 20px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

const StyledLi = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin: 2px 0;
  width: 100%;
  text-align: left;
  transition: background-color 0.3s ease-in;

  &:hover {
    background-color: rgb(7, 236, 240);
    cursor: pointer;
  }
`;
