import styled from "styled-components";

interface OpponentMessageProps {
  payload: string;
}

const Container = styled.div`
  width: 100%;
`;

const MessageBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  max-width: 45%;
`;

function OpponentMessage({ payload }: OpponentMessageProps) {
  return (
    <Container>
      <MessageBox>Mine</MessageBox>
    </Container>
  );
}

export default OpponentMessage;
