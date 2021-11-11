import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import PageTitle from "../components/PageTitle";
import gql from "graphql-tag";
import { PHOTO_FRAGMENT } from "../fragments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { seeHashtag, seeHashtagVariables } from "../__generated__/seeHashtag";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";

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

const Header = styled.div`
  display: flex;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
`;

const Row = styled.div`
  font-size: 16px;
  display: flex;
`;

const Username = styled.span`
  font-size: 28px;
  font-weight: 300;
`;

const ItemContainer = styled.ul`
  display: flex;
  margin: 30px 0px;
`;

const Item = styled.li`
  margin-right: 40px;
`;

const Value = styled(FatText)``;

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
        hashtag: `#${hashtag}`,
      },
    }
  );
  return (
    <>
      <PageTitle title={`#${hashtag} hashtag`} />
      <Header>
        <Avatar
          size="150"
          url={
            data?.seeHashtag?.photos && data.seeHashtag.photos.length > 0
              ? data.seeHashtag.photos[0]?.file
              : null
          }
        />
        <RowContainer>
          <Row>
            <Username>{data?.seeHashtag?.hashtag}</Username>
          </Row>
          <Row>
            <ItemContainer>
              <Item>
                <span>
                  <Value>{data?.seeHashtag?.photos?.length}</Value> posts
                </span>
              </Item>
            </ItemContainer>
          </Row>
        </RowContainer>
      </Header>
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
