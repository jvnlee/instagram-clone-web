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
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onValidSubmit = (data: any) => {
    console.log(data);
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
                value: 6,
                message: "Username should be longer than 6 characters.",
              },
              validate: (currentValue) => currentValue.length >= 6,
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 9,
                message: "Password should be longer than 9 characters.",
              },
              validate: (currentValue) => currentValue.length >= 9,
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value="Log in" disabled={!isValid} />
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
