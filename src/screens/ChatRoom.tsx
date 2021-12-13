import { useMutation, useQuery } from "@apollo/client";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import MessageCreator from "../components/MessageCreator";
import MyMessage from "../components/MyMessage";
import OpponentMessage from "../components/OpponentMessage";
import { FatText } from "../components/shared";
import useUser from "../hooks/useUser";
import { seeRoom, seeRoomVariables } from "../__generated__/seeRoom";

interface ParamsType {
  id: string;
}

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      users {
        id
        firstName
        lastName
        username
        avatar
      }
      messages {
        id
        user {
          username
          avatar
        }
        payload
        createdAt
      }
    }
  }
`;

const READ_MESSAGE_MUTATION = gql`
  mutation readMessage($id: Int!) {
    readMessage(id: $id) {
      status
      error
    }
  }
`;

const ROOM_UPDATES_SUBSCRIPTION = gql`
  subscription roomUpdates($id: Int!) {
    roomUpdates(id: $id) {
      id
      payload
      user {
        username
        avatar
      }
      createdAt
    }
  }
`;

const OpponentInfo = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: auto;
  height: auto;
  margin-right: 10px;
`;

const Username = styled(FatText)`
  font-size: 16px;
`;

const Room = styled.div`
  width: 577px;
  height: calc(60vh - 144px);
  padding: 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`;

function ChatRoom() {
  const { id } = useParams<ParamsType>();
  const roomId = parseInt(id);

  const { data: userData } = useUser();
  const [readMessage] = useMutation(READ_MESSAGE_MUTATION, {
    variables: { id: 26 },
    update: (cache) => {
      cache.modify({
        id: `Room:${roomId}`,
        fields: {
          unreadNum: () => 0,
        },
      });
    },
  });

  const {
    data: roomData,
    loading: roomLoading,
    subscribeToMore,
  } = useQuery<seeRoom, seeRoomVariables>(SEE_ROOM_QUERY, {
    variables: { id: roomId },
    onCompleted: () => readMessage(),
  });

  useEffect(() => {
    subscribeToMore({
      document: ROOM_UPDATES_SUBSCRIPTION,
      variables: { id: roomId },
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.roomUpdates;
        const result = {
          seeRoom: {
            ...prev.seeRoom,
            messages: [newMessage, ...prev.seeRoom.messages],
          },
        };
        return result;
      },
    });
  }, [subscribeToMore, roomId]);

  return (
    <>
      <OpponentInfo>
        <Info>
          <AvatarContainer>
            <Avatar url={roomData?.seeRoom?.users?.[0]?.avatar!} size="24" />
          </AvatarContainer>
          <Username>
            {`${roomData?.seeRoom?.users?.[0]?.firstName!} 
                  ${
                    roomData?.seeRoom?.users?.[0]?.lastName
                      ? roomData?.seeRoom?.users?.[0]?.lastName
                      : ""
                  }`}
          </Username>
        </Info>
        <Link to={`/${roomData?.seeRoom?.users?.[0]?.username}`}>
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        </Link>
      </OpponentInfo>
      <Room>
        {roomLoading
          ? null
          : roomData?.seeRoom?.messages?.map((message) =>
              message?.user.username === userData?.me?.username ? (
                <MyMessage key={message?.id} payload={message?.payload!} />
              ) : (
                <OpponentMessage
                  key={message?.id}
                  payload={message?.payload!}
                />
              )
            )}
      </Room>
      <MessageCreator roomId={roomId} />
    </>
  );
}

export default ChatRoom;
