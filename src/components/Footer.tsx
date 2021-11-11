import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { disableDarkMode, enableDarkMode, isDarkModeVar } from "../apollo";

const SFooter = styled.div`
  margin: 180px auto 0;
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Footer() {
  const darkMode = useReactiveVar(isDarkModeVar);
  return (
    <SFooter>
      <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        <span>{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
      </DarkModeBtn>
    </SFooter>
  );
}

export default Footer;
