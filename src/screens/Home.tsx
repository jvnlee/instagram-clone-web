import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Post from "../components/feed/Photo";
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
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home() {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map(
        (photo) => photo && <Post key={photo.id} {...photo} />
      )}
    </div>
  );
}

export default Home;
