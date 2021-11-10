import { useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useParams } from "react-router";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { Button, FatText } from "../components/shared";
import { PHOTO_FRAGMENT } from "../fragments";
import useUser from "../hooks/useUser";
import {
  seeProfile,
  seeProfileVariables,
  seeProfile_seeProfile,
} from "../__generated__/seeProfile";

interface ParamsType {
  username: string;
}

interface PhotoProps {
  url?: string;
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

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      status
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      status
    }
  }
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
  display: flex;
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

const PhotoGrid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<PhotoProps>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  position: relative;
`;

const PhotoIconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const PhotoIcon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  svg {
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button)`
  margin-left: 20px;
  padding: 8px 24px;
  cursor: pointer;
`;

// const ProfileBtn = styled(SubmitButton).attrs({
//   as: "span",
// })`
//   margin-left: 20px;
// `;

function Profile() {
  const { username } = useParams<ParamsType>();
  const { data: userData } = useUser();
  const { data, loading } = useQuery<seeProfile, seeProfileVariables>(
    SEE_PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: (cache, result) => {
      const {
        data: {
          followUser: { status },
        },
      } = result;
      if (!status) return;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => !prev,
          totalFollowers: (prev) => prev + 1,
        },
      });
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => prev + 1,
        },
      });
    },
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      username,
    },
    update: (cache, result) => {
      const {
        data: {
          unfollowUser: { status },
        },
      } = result;
      if (!status) return;
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing: (prev) => !prev,
          totalFollowers: (prev) => prev - 1,
        },
      });
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing: (prev) => prev - 1,
        },
      });
    },
  });

  const createBtn = (seeProfile: seeProfile_seeProfile) => {
    const { isMe, isFollowing } = seeProfile;
    if (isMe) {
      return <ProfileBtn>Edit Profile</ProfileBtn>;
    }
    if (isFollowing) {
      return <ProfileBtn onClick={() => unfollowUser()}>Unfollow</ProfileBtn>;
    } else {
      return <ProfileBtn onClick={() => followUser()}>Follow</ProfileBtn>;
    }
  };

  const pageTitle = `${data?.seeProfile?.firstName!} ${
    data?.seeProfile?.lastName
  } (@${data?.seeProfile?.username})`;

  return (
    <>
      <PageTitle title={loading ? "Loading" : pageTitle} />
      <Header>
        <Avatar size="150" url={data?.seeProfile?.avatar} />
        <RowContainer>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? createBtn(data.seeProfile) : null}
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
      <PhotoGrid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo key={photo?.id} url={photo?.file}>
            <PhotoIconContainer>
              <PhotoIcon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </PhotoIcon>
              <PhotoIcon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.commentNum}
              </PhotoIcon>
            </PhotoIconContainer>
          </Photo>
        ))}
      </PhotoGrid>
    </>
  );
}

export default Profile;