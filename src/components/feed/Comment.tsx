import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import CommentModal from "../CommentModal";
import { FatText } from "../shared";
import TimeBefore from "../TimeBefore";

interface CommentProps {
  id?: number;
  photoId?: number;
  avatarOn?: boolean;
  avatar?: string;
  author?: string;
  payload?: string;
  isMine?: boolean;
  createdAt?: string;
  margin?: string;
}

const CommentContainer = styled.div<CommentProps>`
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
`;

const AvatarContainer = styled.div`
  margin-right: 12px;
`;

const Caption = styled.span`
  word-break: break-all;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
  line-height: 1.3em;
`;

const Username = styled(FatText)`
  color: ${(props) => props.theme.fontColor};
  margin-right: 5px;
`;

const CommentBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Icon = styled.div`
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  :hover {
    opacity: 0.5;
  }
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
  createdAt,
}: CommentProps) {
  const [commentModal, setCommentModal] = useState(false);

  return (
    <>
      <CommentContainer margin={margin}>
        <Wrapper>
          {avatarOn ? (
            <AvatarContainer>
              <Avatar size="32" url={avatar} />
            </AvatarContainer>
          ) : null}
          <Caption>
            <Link to={`/${author}`}>
              <Username>{author}</Username>
            </Link>
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
            {createdAt ? (
              <CommentBottom>
                {TimeBefore(createdAt!)}
                {isMine ? (
                  <Icon onClick={() => setCommentModal(true)}>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </Icon>
                ) : null}
              </CommentBottom>
            ) : null}
          </Caption>
        </Wrapper>
      </CommentContainer>
      {commentModal ? (
        <CommentModal
          id={id!}
          photoId={photoId!}
          setCommentModal={setCommentModal}
        />
      ) : null}
    </>
  );
}

export default Comment;
