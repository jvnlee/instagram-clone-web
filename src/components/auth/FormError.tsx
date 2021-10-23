import styled from "styled-components";

interface IProps {
  message?: string;
}

const SFormError = styled.span`
  color: red;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
`;

function FormError({ message }: IProps) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
