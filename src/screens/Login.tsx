import AuthLayout from "../components/auth/AuthLayout";
import Separator from "../components/auth/Separator";
import Input from "../components/auth/Input";
import TopBox from "../components/auth/TopBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import Logo from "../components/auth/Logo";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";
import FacebookLogin from "../components/auth/FacebookLogin";
import Notification from "../components/auth/Notification";
import { login, loginVariables } from "../__generated__/login";
import SubmitButton from "../components/auth/SubmitButton";

interface FormProps {
  username: string;
  password: string;
  loginError?: string;
}

interface LocationStateProps {
  message?: string;
  username?: string;
  password?: string;
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
  const location = useLocation<LocationStateProps>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });

  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        const {
          login: { status, token, error },
        } = data;
        if (!status && error) {
          return setError("loginError", {
            message: error,
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    }
  );
  const onValidSubmit: SubmitHandler<loginVariables> = (data) => {
    if (loading) return;
    login({
      variables: { ...data },
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
        <Notification message={location?.state?.message} />
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
          <SubmitButton
            type="submit"
            value="Log in"
            disabled={!isValid || loading}
          />
          <FormError message={errors?.loginError?.message} />
        </form>
        <Separator />
        <FacebookLogin isButton={false} />
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
