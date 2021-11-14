/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchUser
// ====================================================

export interface searchUser_searchUser_searchResult {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
  firstName: string;
  lastName: string | null;
}

export interface searchUser_searchUser {
  __typename: "SearchUsersResult";
  searchResult: (searchUser_searchUser_searchResult | null)[] | null;
  error: string | null;
}

export interface searchUser {
  searchUser: searchUser_searchUser;
}

export interface searchUserVariables {
  keyword: string;
  lastId?: number | null;
}
