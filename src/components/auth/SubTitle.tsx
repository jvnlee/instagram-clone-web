import styled from "styled-components";
import { FatLink } from "../shared";

interface Props {
  text: string;
}

const SSubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  line-height: 20px;
`;

function SubTitle({ text }: Props) {
  return <SSubTitle>{text}</SSubTitle>;
}

export default SubTitle;
