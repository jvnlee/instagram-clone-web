import { useQuery, useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import { BaseBox, Button } from "./shared";
import gql from "graphql-tag";

const SEARCH_USER_QUERY = gql`
  query searchUser($keyword: String!, $lastId: Int) {
    searchUser(keyword: $keyword, lastId: $lastId) {
      user {
        id
        username
        avatar
        firstName
        lastName
      }
      error
    }
  }
`;

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

const SearchBar = styled.input`
  width: 210px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 3px;
  padding: 7px;
`;

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

const LoginBtn = styled(Button)``;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData } = useUser();
  const { register, getValues, watch } = useForm({
    mode: "onChange",
  });
  const { keyword } = getValues();
  const { loading, data } = useQuery(SEARCH_USER_QUERY, {
    variables: { keyword },
  });
  console.log(watch());
  loading ? console.log("loading...") : console.log(data);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
        </Column>
        <Column>
          <form>
            <SearchBar
              {...register("keyword", { required: true })}
              type="text"
              placeholder="Search"
            />
          </form>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} />
              </Icon>
              {userData?.me?.avatar ? (
                <Icon>
                  <Link to={`/${userData?.me?.username}`}>
                    <Avatar size="22" url={userData?.me?.avatar} />
                  </Link>
                </Icon>
              ) : (
                <Icon>
                  <Link to={`/${userData?.me?.username}`}>
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
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
