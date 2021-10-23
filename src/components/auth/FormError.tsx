import styled from "styled-components";

interface ErrorProps {
  message?: string;
}

const SFormError = styled.span`
  color: red;
  font-weight: 600;
  font-size: 12px;
  margin-top: 5px;
`;

function FormError({ message }: ErrorProps) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
