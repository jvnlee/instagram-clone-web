import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import SubmitButton from "../components/auth/SubmitButton";
import TopBox from "../components/auth/TopBox";
import routes from "../routes";
import Logo from "../components/auth/Logo";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import FormError from "../components/auth/FormError";
import { useHistory } from "react-router";
import SubTitle from "../components/auth/SubTitle";
import SignUpHeader from "../components/auth/SignUpHeader";
import FacebookLogin from "../components/auth/FacebookLogin";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

interface FormProps {
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
    getValues,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onChange",
  });
  const history = useHistory();
  const [createAccount, { loading }] = useMutation<createAccount>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted: (data) => {
        const {
          createAccount: { status, error },
        } = data;
        const { username, password } = getValues();
        if (!status && error) {
          return setError("createAccountError", {
            message: error,
          });
        }
        history.push(routes.home, {
          message: "Successfully signed up! Please log in with your account",
          username,
          password,
        });
      },
    }
  );
  const onValidSubmit: SubmitHandler<createAccountVariables> = (data) => {
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
        <SignUpHeader>
          <Logo />
          <SubTitle text="Sign up to see photos and videos from your friends." />
        </SignUpHeader>
        <FacebookLogin isButton={true} />
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
            {...register("firstName", {
              required: "First name is required.",
            })}
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
          <SubmitButton
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
