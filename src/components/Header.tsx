import { useQuery, useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";
import { BaseBox, Button, FatText } from "./shared";
import gql from "graphql-tag";
import { searchUser, searchUserVariables } from "../__generated__/searchUser";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  faCompass,
  faPlusSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

interface FormProps {
  keyword: string;
  searchUserError?: string;
}

const SEARCH_USER_QUERY = gql`
  query searchUser($keyword: String!, $lastId: Int) {
    searchUser(keyword: $keyword, lastId: $lastId) {
      searchResult {
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
  position: fixed;
  top: 0;
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

const ModalContainer = styled.div`
  position: fixed;
  top: 55px;
  left: calc(50vw - 215px);
  z-index: 9999;
`;

const Modal = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 15px;
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 6px;
  box-shadow: 0 -6px 0 #fff, 0 1px 6px rgba(0, 0, 0, 0.35);
  overflow-y: scroll;
`;

const UserContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Username = styled(FatText)``;

const Name = styled.span`
  opacity: 0.7;
  margin-top: 5px;
`;

const Error = styled.span`
  opacity: 0.7;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData } = useUser();
  const [modalOn, setModalOn] = useState<boolean>(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      keyword: "",
    },
  });
  const { keyword } = watch();
  const { data } = useQuery<searchUser, searchUserVariables>(
    SEARCH_USER_QUERY,
    {
      variables: { keyword },
      onCompleted: (data) => {
        const { searchResult, error } = data?.searchUser!;
        if (searchResult?.length === 0 && error) {
          return setError("searchUserError", {
            message: error,
          });
        } else {
          clearErrors("searchUserError");
        }
      },
    }
  );
  const history = useHistory();
  const onValidSubmit = () => {
    const result = data?.searchUser.searchResult;
    if (result && result.length > 0) {
      history.push(`/${result[0]?.username}`);
    }
    setModalOn(false);
    setValue("keyword", "");
  };

  return (
    <>
      <SHeader>
        <Wrapper>
          <Column>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
          </Column>
          <Column>
            <form onSubmit={handleSubmit(onValidSubmit)}>
              <SearchBar
                {...register("keyword", {
                  required: true,
                })}
                type="text"
                placeholder="Search"
                autoComplete="off"
                onFocus={() => setModalOn(true)}
                onBlur={() => setModalOn(false)}
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
                  <Link to={routes.create}>
                    <FontAwesomeIcon icon={faPlusSquare} />
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
      {modalOn ? (
        <ModalContainer>
          <Modal>
            {data?.searchUser.searchResult?.map((user) => (
              <UserContainer key={user?.id}>
                <Link to={`/${user?.username}`}>
                  <Avatar size="32" url={user?.avatar} />
                </Link>
                <Link to={`/${user?.username}`}>
                  <TextContainer>
                    <Username>{user?.username}</Username>
                    <Name>
                      {user?.firstName} {user?.lastName!}
                    </Name>
                  </TextContainer>
                </Link>
              </UserContainer>
            ))}
            <Error>{errors?.searchUserError?.message!}</Error>
          </Modal>
        </ModalContainer>
      ) : null}
    </>
  );
}

export default Header;
