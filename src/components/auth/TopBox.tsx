import { PropsWithChildren } from "react";
import styled from "styled-components";
import { BaseBox } from "../shared";

const STopBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  flex-direction: column;
  form {
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: column;
  }
`;

function TopBox({ children }: PropsWithChildren<any>) {
  return <STopBox>{children}</STopBox>;
}

export default TopBox;
