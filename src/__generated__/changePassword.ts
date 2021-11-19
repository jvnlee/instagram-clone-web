/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changePassword
// ====================================================

export interface changePassword_editProfile {
  __typename: "MutationResponse";
  status: boolean;
  error: string | null;
}

export interface changePassword {
  editProfile: changePassword_editProfile;
}

export interface changePasswordVariables {
  password: string;
  newPassword: string;
}
