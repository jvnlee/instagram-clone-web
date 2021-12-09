import { useMutation } from "@apollo/client";
import { toggleLike, toggleLikeVariables } from "../__generated__/toggleLike";
import gql from "graphql-tag";
import { seePhoto_seePhoto } from "../__generated__/seePhoto";
import { FatText } from "./shared";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";

interface PhotoActionsProps {
  photo: seeFeed_seeFeed | seePhoto_seePhoto;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      status
      error
    }
  }
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

function PhotoActions({ photo }: PhotoActionsProps) {
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
    <>
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
    </>
  );
}

export default PhotoActions;
