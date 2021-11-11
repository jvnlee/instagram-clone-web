/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seePhoto
// ====================================================

export interface seePhoto_seePhoto_user {
  __typename: "User";
  username: string;
  avatar: string | null;
  isFollowing: boolean;
}

export interface seePhoto_seePhoto_comments_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seePhoto_seePhoto_comments {
  __typename: "Comment";
  id: number;
  user: seePhoto_seePhoto_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

export interface seePhoto_seePhoto {
  __typename: "Photo";
  user: seePhoto_seePhoto_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
  id: number;
  file: string;
  likes: number;
  commentNum: number;
  isLiked: boolean;
  comments: (seePhoto_seePhoto_comments | null)[] | null;
}

export interface seePhoto {
  seePhoto: seePhoto_seePhoto | null;
}

export interface seePhotoVariables {
  id: number;
}
