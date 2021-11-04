import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import { FatText } from "../shared";

interface CommentProps {
  id?: number;
  photoId?: number;
  author: string;
  payload: string;
  isMine?: boolean;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      status
      error
    }
  }
`;

const CommentContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Caption = styled.span`
  margin-left: 5px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

const DeleteBtn = styled.button`
  color: #7f7f7f;
  font-size: 12px;
  border: 0.5px solid #7f7f7f;
  padding: 2px 8px;
  border-radius: 10px;
  vertical-align: middle;
`;

function Comment({ id, photoId, author, payload, isMine }: CommentProps) {
  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT_MUTATION,
    {
      variables: { id: id! },
      update: (cache, result) => {
        const { status, error } = result.data?.deleteComment!;
        if (status) {
          cache.evict({ id: `Comment:${id}` });
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              commentNum: (prev) => prev - 1,
            },
          });
        }
      },
    }
  );
  const onDeleteClick = () => {
    deleteComment();
  };
  return (
    <CommentContainer>
      <div>
        <FatText>{author}</FatText>
        <Caption>
          {payload.split(" ").map((word: string, index: number) =>
            /#[\w]+|@[\w]+/.test(word) ? (
              word.includes("#") ? (
                <React.Fragment key={index}>
                  <Link to={`/hashtags/${word.substring(1)}`}>{word}</Link>
                  &nbsp;
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  <Link to={`/${word.substring(1)}`}>{word}</Link>
                  &nbsp;
                </React.Fragment>
              )
            ) : (
              <React.Fragment key={index}>{word}&nbsp;</React.Fragment>
            )
          )}
        </Caption>
      </div>
      {isMine ? <DeleteBtn onClick={onDeleteClick}>Delete</DeleteBtn> : null}
    </CommentContainer>
  );
}

export default Comment;
