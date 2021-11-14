import { PropsWithChildren } from "react";
import styled from "styled-components";

const SSignUpHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function SignUpHeader({ children }: PropsWithChildren<any>) {
  return <SSignUpHeader>{children}</SSignUpHeader>;
}

export default SignUpHeader;
