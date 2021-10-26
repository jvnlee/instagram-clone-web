import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const SHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 6px 0px;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </Column>
        <div>
          {isLoggedIn ? (
            <>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="2x" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="2x" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </Icon>
            </>
          ) : null}
        </div>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
