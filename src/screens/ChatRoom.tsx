import { useMutation, useQuery } from "@apollo/client";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import MessageCreator from "../components/chat/MessageCreator";
import MyMessage from "../components/chat/MyMessage";
import OpponentMessage from "../components/chat/OpponentMessage";
import { FatText } from "../components/shared";
import useUser from "../hooks/useUser";
import { seeRoom, seeRoomVariables } from "../__generated__/seeRoom";

interface ParamsType {
  id: string;
}

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!, $lastId: Int) {
    seeRoom(id: $id) {
      id
      users {
        id
        firstName
        lastName
        username
        avatar
      }
      messages(lastId: $lastId) {
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
        id
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
  padding: 20px 20px 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
`;

function ChatRoom() {
  const { id } = useParams<ParamsType>();
  const roomId = parseInt(id);

  const { data: userData } = useUser();

  const [readMessage] = useMutation(READ_MESSAGE_MUTATION, {
    variables: { id: roomId },
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
    fetchMore,
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

  const roomWithScroll = useRef<HTMLDivElement>(null);

  const lastId: number | null =
    roomData?.seeRoom?.messages?.[roomData.seeRoom.messages.length - 1]?.id!;

  const onScrolledToTop = () => {
    fetchMore({
      variables: { lastId },
      // updateQuery will be removed in the next major version of Apollo Client.
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const prevResult = prev.seeRoom?.messages!;
        const newResult = fetchMoreResult.seeRoom?.messages!;
        return {
          seeRoom: {
            ...prev.seeRoom!,
            messages: [...prevResult, ...newResult],
          },
        };
      },
    });
  };

  const onRoomScroll = () => {
    const scrollTop = roomWithScroll?.current?.scrollTop;
    const scrollHeight = roomWithScroll?.current?.scrollHeight;
    const clientHeight = roomWithScroll?.current?.clientHeight;
    const scrolledToTop =
      Math.ceil(clientHeight! - scrollTop!) >= scrollHeight! - 10;
    if (scrolledToTop) onScrolledToTop();
  };

  useEffect(() => {
    window.addEventListener("scroll", onRoomScroll);
    return () => window.removeEventListener("scroll", onRoomScroll);
  });

  const opponent = roomData?.seeRoom?.users?.find(
    (user) => user?.username !== userData?.me?.username
  );

  return (
    <>
      <OpponentInfo>
        <Info>
          <AvatarContainer>
            <Avatar url={opponent?.avatar!} size="24" />
          </AvatarContainer>
          <Username>
            {`${opponent?.firstName!} 
                  ${opponent?.lastName ? opponent?.lastName : ""}`}
          </Username>
        </Info>
        <Link to={`/${opponent?.username}`}>
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
        </Link>
      </OpponentInfo>
      <Room ref={roomWithScroll} onScroll={() => onRoomScroll()}>
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
      <MessageCreator roomId={roomId} roomWithScroll={roomWithScroll} />
    </>
  );
}

export default ChatRoom;
