import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import { seeRooms } from "../__generated__/seeRooms";
import useUser from "../hooks/useUser";
import ChatRoom from "./ChatRoom";
import { useLocation } from "react-router";

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
  height: 60vh;
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  :first-child {
    border-right: 1px solid ${(props) => props.theme.borderColor};
  }
  overflow-x: hidden;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomList = styled.div`
  width: 350px;
  height: calc(60vh - 60px);
  padding-top: 12px;
  overflow-y: scroll;
`;

const RoomContainer = styled.div`
  width: 100%;
  height: 72px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  width: auto;
  height: auto;
  margin-right: 10px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Username = styled(FatText)`
  font-size: 16px;
`;

const Message = styled.span`
  display: block;
  margin-top: 5px;
  opacity: 0.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NewMessageCount = styled(FatText)`
  display: block;
  margin-top: 5px;
`;

function DirectMessages() {
  const { pathname } = useLocation();

  const { data: userData } = useUser();
  const { data, loading } = useQuery<seeRooms>(SEE_ROOMS_QUERY);

  let opponent;

  return (
    <>
      <PageTitle title="Inbox" />
      <Container>
        <Wrapper>
          <UserInfo>
            <Username>{userData?.me?.username}</Username>
          </UserInfo>
          <RoomList>
            {loading
              ? null
              : data?.seeRooms?.map((room) => {
                  opponent = room?.users?.find(
                    (user) => user?.username !== userData?.me?.username
                  );
                  return (
                    room && (
                      <Link key={room.id} to={`/direct/${room.id}`}>
                        <RoomContainer>
                          <AvatarContainer>
                            <Avatar url={opponent?.avatar!} size="56" />
                          </AvatarContainer>
                          <RoomInfo>
                            <span>{opponent?.username}</span>
                            {room.unreadNum === 0 ? (
                              <Message>{room.messages?.[0]?.payload}</Message>
                            ) : (
                              <NewMessageCount>{`${room.unreadNum} new message(s)`}</NewMessageCount>
                            )}
                          </RoomInfo>
                        </RoomContainer>
                      </Link>
                    )
                  );
                })}
          </RoomList>
        </Wrapper>
        <Wrapper>{pathname === "/direct/inbox" ? null : <ChatRoom />}</Wrapper>
      </Container>
    </>
  );
}

export default DirectMessages;
