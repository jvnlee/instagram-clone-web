import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import Button from "../components/auth/Button";
import TopBox from "../components/auth/TopBox";
import { FatLink } from "../components/shared";
import routes from "../routes";
import Logo from "../components/auth/Logo";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  line-height: 20px;
`;

const FacebookLoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  border: none;
  border-radius: 3px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 6px 0px;
  font-weight: 600;
  font-size: 18px;
  align-items: center;
  span {
    margin: 1.5px 0px 0px 10px;
    font-size: 14px;
  }
`;

interface CreateAccountProps {
  email: string;
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  createAccountError?: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $lastName: String
    $username: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      username: $username
      password: $password
    ) {
      status
      error
    }
  }
`;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<CreateAccountProps>({
    mode: "onChange",
  });
  const history = useHistory();
  const onCompleted = (data: any) => {
    const {
      createAccount: { status, error },
    } = data;
    if (!status) {
      return setError("createAccountError", {
        message: error,
      });
    }
    history.push(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const onValidSubmit: SubmitHandler<CreateAccountProps> = (data) => {
    if (loading) return;
    createAccount({
      variables: { ...data },
    });
  };
  const clearCreateAccountError = () => {
    clearErrors("createAccountError");
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <TopBox>
        <HeaderContainer>
          <Logo />
          <SubTitle>
            Sign up to see photos and videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <FacebookLoginButton>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLoginButton>
        <Separator />
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <Input
            {...register("email", { required: "Email is required." })}
            type="text"
            placeholder="Email"
            onFocus={clearCreateAccountError}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("firstName", { required: "First name is required." })}
            type="text"
            placeholder="First Name"
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 characters.",
              },
              validate: (currentValue) => currentValue.length >= 3,
            })}
            type="text"
            placeholder="Username"
            onFocus={clearCreateAccountError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 3,
                message: "Password should be longer than 3 characters.",
              },
              validate: (currentValue) => currentValue.length >= 3,
            })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value="Sign Up"
            disabled={!isValid || loading}
          />
          <FormError message={errors?.createAccountError?.message} />
        </form>
      </TopBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
}

export default SignUp;
