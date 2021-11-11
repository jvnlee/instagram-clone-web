import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import {
  createComment,
  createCommentVariables,
} from "../../__generated__/createComment";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comment from "./Comment";

interface CommentsProps {
  photo: seeFeed_seeFeed;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      status
      error
      id
    }
  }
`;

const Container = styled.div`
  margin-top: 10px;
`;

const CommentCount = styled.span`
  display: block;
  margin-top: 14px;
  opacity: 0.5;
  font-weight: 600;
`;

const InputContainer = styled.div`
  margin-top: 10px;
  padding: 15px 0px 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const Input = styled.input`
  width: 100%;
`;

function Comments({ photo }: CommentsProps) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [createComment, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    update: (cache, result) => {
      const { payload } = getValues();
      setValue("payload", "");
      const { status, id } = result.data?.createComment!;
      if (status && userData?.me) {
        const newComment = {
          __typename: "Comment",
          createdAt: `${Date.now()}`,
          id,
          isMine: true,
          payload,
          user: { ...userData?.me },
        };
        const newCacheComment = cache.writeFragment({
          fragment: gql`
            fragment newComment on Comment {
              id
              createdAt
              isMine
              payload
              user {
                username
                avatar
              }
            }
          `,
          data: newComment,
        });
        cache.modify({
          id: `Photo:${photo.id}`,
          fields: {
            comments: (prev) => [...prev, newCacheComment],
            commentNum: (prev) => prev + 1,
          },
        });
      }
    },
  });
  const onValidSubmit: SubmitHandler<createCommentVariables> = (data) => {
    const { payload } = data;
    if (loading) return;
    createComment({
      variables: {
        photoId: photo.id,
        payload,
      },
    });
  };

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
          isMine={comment?.isMine}
          margin="12px 0 0"
        />
      ))}
      <InputContainer>
        <form onSubmit={handleSubmit(onValidSubmit)} autoComplete="off">
          <Input
            {...register("payload", { required: true })}
            type="text"
            placeholder="Add a comment..."
          />
        </form>
      </InputContainer>
    </Container>
  );
}

export default Comments;
