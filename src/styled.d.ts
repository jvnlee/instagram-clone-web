import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    borderColor: string;
    accent: string;
  }
}
