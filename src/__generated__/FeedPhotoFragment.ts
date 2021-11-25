/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedPhotoFragment
// ====================================================

export interface FeedPhotoFragment_user {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface FeedPhotoFragment {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNum: number;
  isLiked: boolean;
  user: FeedPhotoFragment_user;
  caption: string | null;
  createdAt: string;
  isMine: boolean;
}
