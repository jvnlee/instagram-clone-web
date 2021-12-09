import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import gql from "graphql-tag";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { seeFeed_seeFeed } from "../__generated__/seeFeed";
import { seePhoto_seePhoto } from "../__generated__/seePhoto";
import Avatar from "./Avatar";

interface CommentCreatorProps {
  photo: seeFeed_seeFeed | seePhoto_seePhoto;
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 15px 0px 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const Input = styled.input`
  margin-left: 8px;
  width: 100%;
`;

function CommentCreator({ photo }: CommentCreatorProps) {
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
    <InputContainer>
      <Avatar url={userData?.me?.avatar} size="32" />
      <form onSubmit={handleSubmit(onValidSubmit)} autoComplete="off">
        <Input
          {...register("payload", { required: true })}
          type="text"
          placeholder="Add a comment..."
        />
      </form>
    </InputContainer>
  );
}

export default CommentCreator;
