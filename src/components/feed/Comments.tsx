import styled from "styled-components";
import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_comments,
} from "../../__generated__/seeFeed";
import Comment from "./Comment";

const Container = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  display: block;
  margin-top: 10px;
  opacity: 0.5;
  font-weight: 600;
`;

function Comments({ author, caption, commentNum, comments }: any) {
  return (
    <Container>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNum === 1 ? "1 comment" : `${commentNum} comments`}
      </CommentCount>
      {comments?.map((comment: any) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </Container>
  );
}

export default Comments;
