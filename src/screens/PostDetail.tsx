import { useQuery } from "@apollo/client";
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
import TimeBefore from "../components/TimeBefore";

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
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

const PhotoRight = styled.div`
  width: 330px;
  height: auto;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
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
          </Top>
          <Middle>
            <Comment
              avatarOn={true}
              avatar={data?.seePhoto?.user.avatar!}
              author={data?.seePhoto?.user.username!}
              payload={data?.seePhoto?.caption!}
            />
            {TimeBefore(data?.seePhoto?.createdAt!)}
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
                margin="12px 0 0"
              />
            ))}
          </Middle>
        </PhotoRight>
      </Container>
    </>
  );
}

export default PostDetail;
