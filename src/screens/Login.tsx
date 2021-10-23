import styled from "styled-components";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import TopBox from "../components/auth/TopBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import Logo from "../components/auth/Logo";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface LoginProps {
  username: string;
  password: string;
  loginError?: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginProps>({
    mode: "onChange",
  });
  const onCompleted = (data: any) => {
    const {
      login: { status, token, error },
    } = data;
    if (!status) {
      setError("loginError", {
        message: error,
      });
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });
  const onValidSubmit = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  const clearLoginError = () => {
    clearErrors("loginError");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <TopBox>
        <Logo />
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username should be longer than 3 characters.",
              },
              validate: (currentValue) => currentValue.length >= 3,
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password should be longer than 3 characters.",
              },
              validate: (currentValue) => currentValue.length >= 3,
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
            onFocus={clearLoginError}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value="Log in" disabled={!isValid || loading} />
          <FormError message={errors?.loginError?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </TopBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
}

export default Login;
