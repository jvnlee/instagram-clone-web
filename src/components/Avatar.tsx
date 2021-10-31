import styled from "styled-components";

interface Props {
  size: string;
  url?: string | null;
}

const SAvatar = styled.div<Props>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
`;

function Avatar({ size, url }: Props) {
  return <SAvatar size={size}>{url ? <Image src={url} /> : null}</SAvatar>;
}

export default Avatar;
