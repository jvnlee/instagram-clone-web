import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import PageTitle from "../components/PageTitle";
import gql from "graphql-tag";
import { PHOTO_FRAGMENT } from "../fragments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { seeHashtag, seeHashtagVariables } from "../__generated__/seeHashtag";

interface ParamsType {
  hashtag: string;
}

interface PhotoProps {
  url?: string;
}

const SEE_HASHTAG_QUERY = gql`
  query seeHashtag($hashtag: String!) {
    seeHashtag(hashtag: $hashtag) {
      hashtag
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<PhotoProps>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  position: relative;
`;

const PhotoIconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const PhotoIcon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 10px;
  svg {
    margin-right: 5px;
  }
`;

function HashtagFeed() {
  const { hashtag } = useParams<ParamsType>();
  const { data } = useQuery<seeHashtag, seeHashtagVariables>(
    SEE_HASHTAG_QUERY,
    {
      variables: {
        hashtag,
      },
    }
  );

  return (
    <>
      <PageTitle title={`#${hashtag} hashtag`} />
      <h1>Hello</h1>
      <PhotoGrid>
        {data?.seeHashtag?.photos?.map((photo) => (
          <Photo key={photo?.id} url={photo?.file}>
            <PhotoIconContainer>
              <PhotoIcon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </PhotoIcon>
              <PhotoIcon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.commentNum}
              </PhotoIcon>
            </PhotoIconContainer>
          </Photo>
        ))}
      </PhotoGrid>
    </>
  );
}

export default HashtagFeed;
