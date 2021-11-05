import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import { PHOTO_FRAGMENT } from "../fragments";

interface ParamsType {
  username: string;
}

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

function Profile() {
  const { username } = useParams<ParamsType>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  console.log(data);
  return <h1>Profile</h1>;
}

export default Profile;
