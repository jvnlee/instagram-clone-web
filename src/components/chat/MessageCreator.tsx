import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import gql from "graphql-tag";
import {
  sendMessage,
  sendMessageVariables,
} from "../../__generated__/sendMessage";

interface MessageCreatorProps {
  roomId: number;
}

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int!) {
    sendMessage(payload: $payload, roomId: $roomId) {
      status
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 84px;
  padding: 20px;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 44px;
  max-height: auto;
  padding: 0 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PayloadInput = styled.input`
  width: 90%;
  height: 100%;
  display: flex;
  text-align: start;
  overflow: auto;
`;

const SendButton = styled.input`
  font-weight: 600;
  color: ${(props) => props.theme.accent};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  cursor: pointer;
`;

function MessageCreator({ roomId }: MessageCreatorProps) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const [sendMessage] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE_MUTATION
  );

  const onValidSubmit = () => {
    const { payload } = getValues();
    sendMessage({ variables: { payload, roomId } });
    reset({ payload: "" });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <InputWrapper>
          <PayloadInput
            {...register("payload", { required: true })}
            placeholder="Message..."
            autoComplete="off"
          />
          <SendButton value="Send" type="submit" disabled={!isValid} />
        </InputWrapper>
      </form>
    </Container>
  );
}

export default MessageCreator;
