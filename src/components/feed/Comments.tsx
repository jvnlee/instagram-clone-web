import { Link } from "react-router-dom";
import styled from "styled-components";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { seePhoto_seePhoto } from "../../__generated__/seePhoto";
import CommentCreator from "../CommentCreator";
import Comment from "./Comment";

interface CommentsProps {
  photo: seeFeed_seeFeed | seePhoto_seePhoto;
}

const Container = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  display: block;
  margin-top: 10px;
  opacity: 0.5;
  font-weight: 600;
`;

function Comments({ photo }: CommentsProps) {
  return (
    <Container>
      <Comment author={photo?.user.username!} payload={photo?.caption!} />
      <Link to={`/posts/${photo?.id}`}>
        <CommentCount>
          {photo?.commentNum >= 2
            ? `View all ${photo?.commentNum} comments`
            : null}
        </CommentCount>
      </Link>
      {photo?.comments?.slice(-2).map((comment) => (
        <Comment
          key={comment?.id}
          id={comment?.id!}
          photoId={photo.id}
          author={comment?.user.username!}
          payload={comment?.payload!}
          margin="8px 0 0"
        />
      ))}
      <CommentCreator photo={photo} />
    </Container>
  );
}

export default Comments;
