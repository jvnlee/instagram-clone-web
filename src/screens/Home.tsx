import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seeFeed } from "../__generated__/seeFeed";

const SEE_FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      user {
        username
        avatar
      }
      ...PhotoFragment
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

function Home() {
  const { data, loading } = useQuery<seeFeed>(SEE_FEED_QUERY);
  console.log(data, loading);
  return (
    <>
      <PageTitle title="Home" />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        data?.seeFeed?.map(
          (photo) => photo && <Post key={photo.id} photo={photo} />
        )
      )}
    </>
  );
}

export default Home;
