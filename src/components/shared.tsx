import styled from "styled-components";
import { lightMode } from "../styles";

export const BaseBox = styled.div`
  background-color: ${(props) =>
    props.theme === lightMode ? "#ffffff" : "#181818"};
  border: 1px solid
    ${(props) => (props.theme === lightMode ? "#dbdbdb" : "#101010")};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;
