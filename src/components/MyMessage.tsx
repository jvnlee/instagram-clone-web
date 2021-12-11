import styled from "styled-components";

interface MyMessageProps {
  payload: string;
}

const Container = styled.div`
  width: 100%;
`;

const MessageBox = styled.div`
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 50%;
  max-width: 45%;
`;

function MyMessage({ payload }: MyMessageProps) {
  return (
    <Container>
      <MessageBox>{payload}</MessageBox>
    </Container>
  );
}

export default MyMessage;
