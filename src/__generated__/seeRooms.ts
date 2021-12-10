/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRooms
// ====================================================

export interface seeRooms_seeRooms_users {
  __typename: "User";
  id: number;
  username: string;
  avatar: string | null;
}

export interface seeRooms_seeRooms_messages {
  __typename: "Message";
  id: number;
  payload: string;
  createdAt: string;
}

export interface seeRooms_seeRooms {
  __typename: "Room";
  id: number;
  users: (seeRooms_seeRooms_users | null)[] | null;
  messages: (seeRooms_seeRooms_messages | null)[] | null;
  unreadNum: number;
}

export interface seeRooms {
  seeRooms: (seeRooms_seeRooms | null)[] | null;
}
