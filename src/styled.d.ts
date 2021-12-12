import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    boxColor: string;
    fontColor: string;
    borderColor: string;
    chatColor: string;
    accent: string;
  }
}
