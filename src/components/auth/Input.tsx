import styled from "styled-components";

interface StyledProps {
  hasError?: boolean;
}

const Input = styled.input<StyledProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  border: 0.5px solid
    ${(props) => (props.hasError ? "#ff0000" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
