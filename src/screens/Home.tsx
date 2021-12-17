import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import Post from "../components/feed/Post";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { seeFeed, seeFeedVariables } from "../__generated__/seeFeed";

const SEE_FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
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

const Feed = styled.div`
  width: 100%;
  height: auto;
`;

function Home() {
  const { data, loading, fetchMore } = useQuery<seeFeed, seeFeedVariables>(
    SEE_FEED_QUERY
  );
  const feed = useRef<HTMLDivElement>(null);

  const lastId: number | null = data?.seeFeed?.[data.seeFeed?.length - 1]?.id!;

  const onScrolledToBottom = () => {
    fetchMore({
      variables: { lastId },
    });
  };

  const onFeedScroll = () => {
    const scrollY = window.scrollY;
    const feedHeight = feed.current?.clientHeight!;
    const scrolledToBottom = Math.ceil(scrollY + 850) >= feedHeight;
    if (scrolledToBottom) onScrolledToBottom();
  };

  useEffect(() => {
    window.addEventListener("scroll", onFeedScroll);
    return () => window.removeEventListener("scroll", onFeedScroll);
  });

  return (
    <>
      <PageTitle title="Home" />
      <Feed ref={feed} onScroll={() => onFeedScroll()}>
        {loading
          ? null
          : data?.seeFeed?.map(
              (photo) => photo && <Post key={photo.id} photo={photo} />
            )}
      </Feed>
    </>
  );
}

export default Home;
