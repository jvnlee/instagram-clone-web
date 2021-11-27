import { useQuery, useReactiveVar } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seePhoto, seePhotoVariables } from "../__generated__/seePhoto";
import Comment from "../components/feed/Comment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import PhotoModal from "../components/PhotoModal";
import { PhotoMenuVar } from "../apollo";

interface ParamsType {
  id: string;
}

const SEE_PHOTO_QUERY = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      user {
        username
        avatar
        isFollowing
      }
      caption
      createdAt
      isMine
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Container = styled(BaseBox)`
  display: flex;
`;

const PhotoContainer = styled.div`
  width: 600px;
  height: auto;
  background-color: #000000;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

const PhotoRight = styled.div`
  width: 330px;
  height: 600px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 12px;
`;

const Following = styled(FatText)``;

const Follow = styled(FatText)`
  color: ${(props) => props.theme.accent};
`;

const Separator = styled.span`
  margin: 0px 6px;
`;

const Middle = styled.div`
  padding: 16px;
`;

function PostDetail() {
  const { id } = useParams<ParamsType>();
  const photoId = parseInt(id);

  const photoMenu = useReactiveVar(PhotoMenuVar);

  const { data } = useQuery<seePhoto, seePhotoVariables>(SEE_PHOTO_QUERY, {
    variables: {
      id: photoId,
    },
  });

  return (
    <>
      <PageTitle title="Post" />
      <Container>
        <PhotoContainer>
          <Photo src={data?.seePhoto?.file} />
        </PhotoContainer>
        <PhotoRight>
          <Top>
            <UserInfo>
              <Link to={`/${data?.seePhoto?.user.username}`}>
                <Avatar size="32" url={data?.seePhoto?.user.avatar} />
              </Link>
              <Link to={`/${data?.seePhoto?.user.username}`}>
                <Username>{data?.seePhoto?.user.username}</Username>
              </Link>
              <Separator> • </Separator>
              {data?.seePhoto?.user.isFollowing ? (
                <Following>Following</Following>
              ) : (
                <Follow>Follow</Follow>
              )}
            </UserInfo>
            <FontAwesomeIcon
              icon={faEllipsisH}
              onClick={() => PhotoMenuVar(true)}
              style={{ cursor: "pointer" }}
            />
          </Top>
          <Middle>
            <Comment
              avatarOn={true}
              avatar={data?.seePhoto?.user.avatar!}
              author={data?.seePhoto?.user.username!}
              payload={data?.seePhoto?.caption!}
              createdAt={data?.seePhoto?.createdAt!}
            />
            {data?.seePhoto?.comments?.map((comment) => (
              <Comment
                key={comment?.id}
                id={comment?.id!}
                photoId={photoId}
                avatarOn={true}
                avatar={comment?.user.avatar!}
                author={comment?.user.username!}
                payload={comment?.payload!}
                isMine={comment?.isMine}
                createdAt={comment?.createdAt!}
                margin="12px 0 0"
              />
            ))}
          </Middle>
        </PhotoRight>
      </Container>
      {photoMenu ? (
        <PhotoModal
          photoId={photoId}
          file={data?.seePhoto?.file!}
          caption={data?.seePhoto?.caption!}
          username={data?.seePhoto?.user.username!}
          avatar={data?.seePhoto?.user.avatar!}
        />
      ) : null}
    </>
  );
}

export default PostDetail;
