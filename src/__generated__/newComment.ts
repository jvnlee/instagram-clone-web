/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: newComment
// ====================================================

export interface newComment_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface newComment {
  __typename: "Comment";
  id: number;
  createdAt: string;
  isMine: boolean;
  payload: string;
  user: newComment_user;
}
