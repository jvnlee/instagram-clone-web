/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeRoom
// ====================================================

export interface seeRoom_seeRoom_users {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string | null;
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeRoom_messages_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeRoom_seeRoom_messages {
  __typename: "Message";
  id: number;
  user: seeRoom_seeRoom_messages_user;
  payload: string;
  createdAt: string;
}

export interface seeRoom_seeRoom {
  __typename: "Room";
  id: number;
  users: (seeRoom_seeRoom_users | null)[] | null;
  messages: (seeRoom_seeRoom_messages | null)[] | null;
}

export interface seeRoom {
  seeRoom: seeRoom_seeRoom | null;
}

export interface seeRoomVariables {
  id: number;
  lastId?: number | null;
}
