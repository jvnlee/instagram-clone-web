import styled from "styled-components";

interface Props {
  url?: string;
}

const SAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
`;

function Avatar({ url = "" }: Props) {
  return <SAvatar>{url !== "" ? <Image src={url} /> : null}</SAvatar>;
}

export default Avatar;
