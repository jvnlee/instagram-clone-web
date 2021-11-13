import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  disableDarkMode,
  enableDarkMode,
  isDarkModeVar,
  logUserOut,
} from "../apollo";
import { FatText } from "./shared";

const SFooter = styled.div`
  margin: 180px auto 20px;
  max-width: 930px;
`;

const ModeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LogoutBtn = styled(FatText)`
  display: block;
  cursor: pointer;
`;

function Footer() {
  const history = useHistory();
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <SFooter>
      <ModeWrapper>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          <span>
            {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </span>
        </DarkModeBtn>
      </ModeWrapper>
      <LogoutWrapper>
        <LogoutBtn onClick={() => logUserOut(history)}>Logout</LogoutBtn>
      </LogoutWrapper>
    </SFooter>
  );
}

export default Footer;
