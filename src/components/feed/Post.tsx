import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { BaseBox, FatText } from "../shared";
import Avatar from "../Avatar";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Comments from "./Comments";
import { Link } from "react-router-dom";

interface PostProps {
  photo: seeFeed_seeFeed;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      status
      error
    }
  }
`;

const Container = styled(BaseBox)`
  margin-bottom: 30px;
  max-width: 615px;
`;

const PhotoTop = styled.div`
  padding: 14px 4px 14px 16px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 12px;
`;

const Photo = styled.img`
  width: 100%;
  background-color: #000000;
`;

const PhotoBottom = styled.div`
  padding: 6px 16px 8px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px 16px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 24px;
  }
`;

const Action = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-bottom: 12px;
`;

function Post({ photo }: PostProps) {
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { id: photo.id },
      update: (cache, result) => {
        if (result.data?.toggleLike.status) {
          cache.modify({
            id: `Photo:${photo.id}`,
            fields: {
              isLiked: (prev) => !prev,
              likes: (prev) => (photo.isLiked ? prev - 1 : prev + 1),
            },
          });
        }
      },
    }
  );

  return (
    <Container key={photo.id}>
      <PhotoTop>
        <Link to={`/${photo.user.username}`}>
          <Avatar size="32" url={photo.user.avatar} />
        </Link>
        <Link to={`/${photo.user.username}`}>
          <Username>{photo.user.username}</Username>
        </Link>
      </PhotoTop>
      <Photo src={photo.file} />
      <PhotoBottom>
        <ActionsContainer>
          <div>
            <Action onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: photo.isLiked ? "#ed4956" : "inherit" }}
                icon={photo.isLiked ? solidFaHeart : faHeart}
              />
            </Action>
            <Action>
              <Link to={`/posts/${photo.id}`}>
                <FontAwesomeIcon icon={faComment} />
              </Link>
            </Action>
            <Action>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Action>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </ActionsContainer>
        <Likes>{photo.likes === 1 ? "1 Like" : `${photo.likes} Likes`}</Likes>
        <Comments photo={photo} />
      </PhotoBottom>
    </Container>
  );
}

export default Post;
