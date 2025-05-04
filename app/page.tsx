'use client';

import styled from 'styled-components';
import React from 'react';
import FileInput from './FileInput';

const Home = () => {
  return (
    <Container>
      <FontStyledComponent>Upload a File</FontStyledComponent>
      <FileInput />
    </Container>
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
