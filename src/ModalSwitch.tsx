import { useReactiveVar } from "@apollo/client";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import routes from "./routes";
import ChangePassword from "./screens/ChangePassword";
import CreatePost from "./screens/CreatePost";
import EditPost from "./screens/EditPost";
import EditProfile from "./screens/EditProfile";
import HashtagFeed from "./screens/HashtagFeed";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import PostDetail from "./screens/PostDetail";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUp";

interface Background {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: undefined;
}

interface LocationProps {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  background: Background;
}

function ModalSwitch() {
  let location = useLocation<LocationProps>();
  let background = location?.state?.background;
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <>
      <Switch location={background || location}>
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
      {background && (
        <Switch>
          <Route exact path={routes.create}>
            <CreatePost />
          </Route>
          <Route exact path={`/edit/:id`}>
            <EditPost />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default ModalSwitch;
