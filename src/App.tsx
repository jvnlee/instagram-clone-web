import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { isDarkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { darkMode, GlobalStyles, lightMode } from "./styles";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path={routes.home}>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {isLoggedIn ? null : (
            <Route path={routes.signUp}>
              <SignUp />
            </Route>
          )}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
