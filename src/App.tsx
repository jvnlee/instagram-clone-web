import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, isDarkModeVar } from "./apollo";
import ModalSwitch from "./ModalSwitch";
import { darkMode, GlobalStyles, lightMode } from "./styles";

function App() {
  const isDarkMode = useReactiveVar(isDarkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
          <GlobalStyles />
          <Router>
            <ModalSwitch />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
