'use client';

import React from 'react';
import styled from 'styled-components';
import ReactDom from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  return ReactDom.createPortal(
    <OverLay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </Content>
    </OverLay>,
    document.body
  );
};

export default Modal;

const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  position: relative;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  min-width: 300px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
