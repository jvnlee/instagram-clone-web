import { PropsWithChildren } from "react-router/node_modules/@types/react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Content = styled.main`
  margin: 45px auto;
  max-width: 930px;
  width: 100%;
`;

function Layout({ children }: PropsWithChildren<any>) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}

export default Layout;
