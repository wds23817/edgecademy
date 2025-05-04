'use client';

import styled from 'styled-components';
import React from 'react';
import Link from 'next/link';
import FileInput from '../FileInput';

const Home = () => {
  return (
    <>
      <Container>
        <FontStyledComponent>Upload a File</FontStyledComponent>
        <FileInput />
        <StyledLink href='/search'>Go to Search Page</StyledLink>
      </Container>
    </>
  );
};

export default Home;

const FontStyledComponent = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
  color: #333;
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  text-decoration: none;
  color: rgb(82, 1, 221);
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;
