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
import { LikeFragment } from "../../__generated__/LikeFragment";

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

const Comments = styled.div`
  margin-top: 10px;
`;

const Comment = styled.div``;

const Caption = styled.span`
  margin-left: 5px;
`;

const CommentCount = styled.span`
  display: block;
  margin-top: 10px;
  opacity: 0.7;
  font-weight: 600;
`;

function Post({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNum,
  comments,
}: seeFeed_seeFeed) {
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { id },
      update: (cache, result) => {
        if (result.data?.toggleLike.status) {
          const fragmentId = `Photo:${id}`;
          const fragment = gql`
            fragment LikeFragment on Photo {
              isLiked
              likes
            }
          `;
          const cacheData = cache.readFragment<LikeFragment>({
            id: fragmentId,
            fragment,
          });

          cache.writeFragment({
            id: fragmentId,
            fragment,
            data: {
              isLiked: !cacheData?.isLiked,
              likes: cacheData?.isLiked
                ? cacheData?.likes - 1
                : cacheData?.likes! + 1,
            },
          });
        }
      },
    }
  );

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
        <Comments>
          <Comment>
            <FatText>{user.username}</FatText>
            <Caption>{caption}</Caption>
          </Comment>
          <CommentCount>
            {commentNum === 1 ? "1 comment" : `${commentNum} comments`}
          </CommentCount>
        </Comments>
      </PhotoBottom>
    </Container>
  );
}

export default Post;
