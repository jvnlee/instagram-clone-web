import sanitize from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
  margin-top: 10px;
`;

const Caption = styled.span`
  margin-left: 5px;
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
  }
`;

function Comment({ author, payload }: any) {
  const cleanPayload = sanitize(
    payload?.replace(/#[\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <Caption
        dangerouslySetInnerHTML={{
          __html: cleanPayload,
        }}
      />
    </CommentContainer>
  );
}

export default Comment;
