import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightMode: DefaultTheme = {
  bgColor: "#fafafa",
  boxColor: "#ffffff",
  fontColor: "#262626",
  borderColor: "#dbdbdb",
  accent: "#0095f6",
};

export const darkMode: DefaultTheme = {
  bgColor: "#1c1c1c",
  boxColor: "#181818",
  fontColor: "white",
  borderColor: "#101010",
  accent: "#0095f6",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input, button
    {
      all: unset;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: inherit;
      transition: background-color 5000s ease-in-out 0s;
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
      color: inherit;
      text-decoration: none;
    }
`;
