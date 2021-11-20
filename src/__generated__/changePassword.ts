/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changePassword
// ====================================================

export interface changePassword_changePassword {
  __typename: "MutationResponse";
  status: boolean;
  error: string | null;
}

export interface changePassword {
  changePassword: changePassword_changePassword;
}

export interface changePasswordVariables {
  password: string;
  newPassword: string;
}
