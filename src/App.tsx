import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, isDarkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import routes from "./routes";
import HashtagFeed from "./screens/HashtagFeed";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUp";
import { darkMode, GlobalStyles, lightMode } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              <Route path={`/hashtags/:hashtag`}>
                <Layout>
                  <HashtagFeed />
                </Layout>
              </Route>
              {isLoggedIn ? null : (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              )}
              <Route path={`/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
