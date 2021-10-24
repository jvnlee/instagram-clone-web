export interface MutationResponse {
  [key: string]: {
    status: boolean;
    token?: string;
    error: string;
  };
}
