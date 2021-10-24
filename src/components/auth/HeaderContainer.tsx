import { PropsWithChildren } from "react-router/node_modules/@types/react";
import styled from "styled-components";

const SHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function HeaderContainer({ children }: PropsWithChildren<any>) {
  return <SHeaderContainer>{children}</SHeaderContainer>;
}

export default HeaderContainer;
