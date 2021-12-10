import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import { seeRooms } from "../__generated__/seeRooms";

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

const Container = styled(BaseBox)`
  height: 90vh;
  display: flex;
`;

const RoomList = styled.div`
  width: 350px;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.borderColor};
`;

const RoomContainer = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: 56px;
  height: 56px;
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
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY, {
    onCompleted: () => console.log("fetch completed"),
  });

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
                  )
                );
              })}
        </RoomList>
        <ChatBox></ChatBox>
      </Container>
    </>
  );
}

export default DirectMessages;
