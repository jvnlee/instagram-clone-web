import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";
const DARK_MODE = "darkMode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const PhotoMenuVar = makeVar(false);
export const DeleteMenuVar = makeVar(false);

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history?: any) => {
  localStorage.removeItem(TOKEN);
  history?.replace(routes.home, null);
  isLoggedInVar(false);
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  isDarkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  isDarkModeVar(false);
};

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
