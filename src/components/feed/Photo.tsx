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
import { connect } from "tls";

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

const Likes = styled(FatText)``;

function Post({ id, user, file, isLiked, likes }: seeFeed_seeFeed) {
  const updateLike = (cache: any, result: any) => {
    if (result.data?.toggleLike.status) {
      cache.writeFragment({
        id: `Photo:${id}`,
        fragment: gql`
          fragment toggleLike on Photo {
            isLiked
          }
        `,
        data: {
          isLiked: !isLiked,
        },
      });
    }
  };
  const [toggleLikeMutation, { loading }] = useMutation<
    toggleLike,
    toggleLikeVariables
  >(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: updateLike,
  });

  return (
    <Container key={id}>
      <PhotoTop>
        <Avatar size="32" url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoTop>
      <Photo src={file} />
      <PhotoBottom>
        <ActionsContainer>
          <div>
            <Action onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "#ed4956" : "inherit" }}
                icon={isLiked ? solidFaHeart : faHeart}
              />
            </Action>
            <Action>
              <FontAwesomeIcon icon={faComment} />
            </Action>
            <Action>
              <FontAwesomeIcon icon={faPaperPlane} />
            </Action>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </ActionsContainer>
        <Likes>{likes === 1 ? "1 Like" : `${likes} Likes`}</Likes>
      </PhotoBottom>
    </Container>
  );
}

export default Post;
