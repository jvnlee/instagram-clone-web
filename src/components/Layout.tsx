import { PropsWithChildren } from "react-router/node_modules/@types/react";
import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  margin: 45px auto 0px;
  max-width: 930px;
  width: 100%;
`;

function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
