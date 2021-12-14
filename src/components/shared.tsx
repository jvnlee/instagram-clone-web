import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 5px 9px;
  color: white;
  font-weight: 600;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 9000;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  overflow: hidden;
  transition: width 1s linear;
`;

export const ModalButton = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-weight: 600;
  cursor: pointer;
  :nth-child(2) {
    color: #ff0000;
  }
`;
