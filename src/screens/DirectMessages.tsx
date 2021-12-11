import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import { seeRoom, seeRoomVariables } from "../__generated__/seeRoom";
import { seeRooms } from "../__generated__/seeRooms";
import { useParams } from "react-router";
import useUser from "../hooks/useUser";
import MyMessage from "../components/MyMessage";
import OpponentMessage from "../components/OpponentMessage";

interface ParamsType {
  id: string;
}

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      id
      users {
        id
        username
        avatar
      }
      messages {
        id
        payload
        createdAt
      }
      unreadNum
    }
  }
`;

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
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

const Container = styled(BaseBox)`
  height: 90vh;
  display: flex;
`;

const RoomList = styled.div`
  width: 350px;
  height: 100%;
  padding-top: 12px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const RoomContainer = styled.div`
  width: 100%;
  height: 72px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 56px;
  height: 56px;
  margin-right: 10px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled(FatText)``;

const Message = styled.span``;

const ChatBox = styled.div`
  width: 580px;
  height: 100%;
`;

function DirectMessages() {
  const { id } = useParams<ParamsType>();
  const { data: userData } = useUser();
  const roomId = parseInt(id);
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY, {
    onCompleted: () => console.log("fetch completed"),
  });

  const { data: roomData, loading: roomLoading } = useQuery<
    seeRoom,
    seeRoomVariables
  >(SEE_ROOM_QUERY, { variables: { id: roomId } });

  return (
    <>
      <PageTitle title="Inbox" />
      <Container>
        <RoomList>
          {loading
            ? null
            : data?.seeRooms?.map((room) => {
                return (
                  room && (
                    <Link to={`/direct/${room.id}`}>
                      <RoomContainer key={room.id}>
                        <AvatarContainer>
                          <Avatar url={room.users?.[0]?.avatar!} size="56" />
                        </AvatarContainer>
                        <RoomInfo>
                          <Username>{room.users?.[0]?.username}</Username>
                          <Message>
                            {room.unreadNum === 0
                              ? room.messages?.[room.messages?.length! - 1]
                                  ?.payload
                              : `${room.unreadNum} new message(s)`}
                          </Message>
                        </RoomInfo>
                      </RoomContainer>
                    </Link>
                  )
                );
              })}
        </RoomList>
        <ChatBox>
          {roomData?.seeRoom?.messages?.map((message) =>
            message?.user.username === userData?.me?.username ? (
              <MyMessage payload={message?.payload!} />
            ) : (
              <OpponentMessage payload={message?.payload!} />
            )
          )}
        </ChatBox>
      </Container>
    </>
  );
}

export default DirectMessages;
