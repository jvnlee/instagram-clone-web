import styled from "styled-components";

interface MyMessageProps {
  payload: string;
}

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: right;
`;

const MessageBox = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.chatColor};
  border-radius: 22px;
  max-width: 45%;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 16px;
  word-break: break-all;
`;

function MyMessage({ payload }: MyMessageProps) {
  return (
    <Container>
      <MessageBox>{payload}</MessageBox>
    </Container>
  );
}

export default MyMessage;
