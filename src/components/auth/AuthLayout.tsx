import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren } from "react-router/node_modules/@types/react";
import styled from "styled-components";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function AuthLayout({ children }: PropsWithChildren<any>) {
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          <span>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </span>
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

export default AuthLayout;
