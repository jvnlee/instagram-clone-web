import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments {
        id
        user {
          username
        }
        payload
        isMine
        createdAt
      }
      commentNum
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home() {
  const { data, loading } = useQuery<seeFeed>(FEED_QUERY);
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
