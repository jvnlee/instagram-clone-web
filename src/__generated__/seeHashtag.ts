/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeHashtag
// ====================================================

export interface seeHashtag_seeHashtag_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number;
  commentNum: number;
  isLiked: boolean;
}

export interface seeHashtag_seeHashtag {
  __typename: "Hashtag";
  hashtag: string;
  photos: (seeHashtag_seeHashtag_photos | null)[] | null;
  totalPhotos: number;
}

export interface seeHashtag {
  seeHashtag: seeHashtag_seeHashtag | null;
}

export interface seeHashtagVariables {
  hashtag: string;
}
