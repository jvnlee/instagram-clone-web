import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import gql from "graphql-tag";
import { useEffect } from "react";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      email
      firstName
      lastName
      bio
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data, loading };
}

export default useUser;
