/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_editProfile {
  __typename: "EditProfileResponse";
  status: boolean;
  error: string | null;
  avatarUrl: string | null;
}

export interface editProfile {
  editProfile: editProfile_editProfile;
}

export interface editProfileVariables {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  bio?: string | null;
  avatar?: any | null;
}
