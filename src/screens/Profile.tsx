import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import { seeProfile, seeProfileVariables } from "../__generated__/seeProfile";

interface ParamsType {
  username: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`;

const Row = styled.div`
  font-size: 16px;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
`;

const ItemContainer = styled.ul`
  display: flex;
  margin: 30px 0px;
`;

const Item = styled.li`
  margin-right: 40px;
`;

const Value = styled(FatText)``;

const Name = styled(FatText)`
  display: block;
  margin-bottom: 10px;
`;

function Profile() {
  const { username } = useParams<ParamsType>();
  const { data } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );
  return (
    <>
      <Header>
        <Avatar size="150" url={data?.seeProfile?.avatar} />
        <RowContainer>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
          </Row>
          <Row>
            <ItemContainer>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.photos?.length}</Value> posts
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </ItemContainer>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}&nbsp;{data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </RowContainer>
      </Header>
    </>
  );
}

export default Profile;
