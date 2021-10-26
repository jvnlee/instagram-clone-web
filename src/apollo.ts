import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import routes from "./routes";

const TOKEN = "token";
const DARK_MODE = "darkMode";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const isDarkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: any) => {
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

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
