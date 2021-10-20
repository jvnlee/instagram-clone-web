import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <FontAwesomeIcon icon={faInstagram} size="3x" />
    </LogoContainer>
  );
};

export default Logo;
