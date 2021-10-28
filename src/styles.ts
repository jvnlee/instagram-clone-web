import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightMode: DefaultTheme = {
  bgColor: "#fafafa",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "#dbdbdb",
  accent: "#0095f6",
};

export const darkMode: DefaultTheme = {
  bgColor: "#1c1c1c",
  fontColor: "white",
  borderColor: "#dbdbdb",
  accent: "#0095f6",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all: unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.fontColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
    }
    a {
      text-decoration: none;
    }
`;
