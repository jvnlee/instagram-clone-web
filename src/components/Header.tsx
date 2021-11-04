import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import { BaseBox } from "./shared";

const SHeader = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 14px 0px;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 22px;
  }
`;

const Icon = styled.span`
  margin-left: 25px;
`;

const LoginBtn = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 5px 9px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} />
              </Icon>
              {data?.me?.avatar ? (
                <Icon>
                  <Avatar size="22" url={data?.me?.avatar} />
                </Icon>
              ) : (
                <Icon>
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
              )}
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <LoginBtn>Log in</LoginBtn>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;
