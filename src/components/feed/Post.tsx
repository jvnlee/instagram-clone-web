import styled from "styled-components";
import { BaseBox, FatText } from "../shared";
import Avatar from "../Avatar";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import PhotoActions from "../PhotoActions";

interface PostProps {
  photo: seeFeed_seeFeed;
}

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
  background-color: #000000;
`;

const PhotoBottom = styled.div`
  padding: 6px 16px 8px;
`;

function Post({ photo }: PostProps) {
  return (
    <Container key={photo.id}>
      <PhotoTop>
        <Link to={`/${photo.user.username}`}>
          <Avatar size="32" url={photo.user.avatar} />
        </Link>
        <Link to={`/${photo.user.username}`}>
          <Username>{photo.user.username}</Username>
        </Link>
      </PhotoTop>
      <Photo src={photo.file} />
      <PhotoBottom>
        <PhotoActions photo={photo} />
        <Comments photo={photo} />
      </PhotoBottom>
    </Container>
  );
}

export default Post;
