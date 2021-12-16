import styled from "styled-components";

interface OpponentMessageProps {
  payload: string;
}

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: left;
`;

const MessageBox = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 22px;
  max-width: 45%;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 16px;
  word-break: break-all;
`;

function OpponentMessage({ payload }: OpponentMessageProps) {
  return (
    <Container>
      <MessageBox>{payload}</MessageBox>
    </Container>
  );
}

export default OpponentMessage;
