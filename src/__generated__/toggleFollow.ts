/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleFollow
// ====================================================

export interface toggleFollow_toggleFollow {
  __typename: "ToggleFollowResult";
  status: boolean;
  isFollowing: boolean | null;
}

export interface toggleFollow {
  toggleFollow: toggleFollow_toggleFollow;
}

export interface toggleFollowVariables {
  username: string;
}
