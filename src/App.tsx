import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, isDarkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import routes from "./routes";
import ChangePassword from "./screens/ChangePassword";
import Create from "./screens/Create";
import EditProfile from "./screens/EditProfile";
import HashtagFeed from "./screens/HashtagFeed";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import PostDetail from "./screens/PostDetail";
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
              <Route path={`/posts/:id`}>
                <Layout>
                  <PostDetail />
                </Layout>
              </Route>
              {isLoggedIn ? null : (
                <Route exact path={routes.signUp}>
                  <SignUp />
                </Route>
              )}
              <Route exact path={routes.create}>
                <Create />
              </Route>
              <Route exact path={routes.editProfile}>
                <Layout>
                  <EditProfile />
                </Layout>
              </Route>
              <Route exact path={routes.changePassword}>
                <Layout>
                  <ChangePassword />
                </Layout>
              </Route>
              <Route path={`/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
              <Redirect from="*" to={routes.home} />
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
