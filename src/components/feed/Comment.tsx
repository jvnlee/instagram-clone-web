import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  deleteComment,
  deleteCommentVariables,
} from "../../__generated__/deleteComment";
import Avatar from "../Avatar";
import { FatText } from "../shared";

interface CommentProps {
  id?: number;
  photoId?: number;
  avatarOn?: boolean;
  avatar?: string;
  author?: string;
  payload?: string;
  isMine?: boolean;
  margin?: string;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      status
      error
    }
  }
`;

const CommentContainer = styled.div<CommentProps>`
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarContainer = styled.div`
  margin-right: 12px;
`;

const Caption = styled.span`
  margin-left: 5px;
  word-break: break-all;
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
  cursor: pointer;
`;

function Comment({
  id,
  photoId,
  avatarOn,
  avatar,
  author,
  payload,
  isMine,
  margin,
}: CommentProps) {
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
    <CommentContainer margin={margin}>
      <Wrapper>
        {avatarOn ? (
          <AvatarContainer>
            <Avatar size="32" url={avatar} />
          </AvatarContainer>
        ) : null}
        <Link to={`/${author}`}>
          <FatText>{author}</FatText>
        </Link>
        <Caption>
          {payload &&
            payload.split(" ").map((word: string, index: number) =>
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
      </Wrapper>
      {isMine ? <DeleteBtn onClick={onDeleteClick}>Delete</DeleteBtn> : null}
    </CommentContainer>
  );
}

export default Comment;
