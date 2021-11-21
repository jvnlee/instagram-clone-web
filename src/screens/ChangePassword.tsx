import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import SubmitButton from "../components/auth/SubmitButton";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import routes from "../routes";
import { useHistory } from "react-router";
import gql from "graphql-tag";
import {
  changePassword,
  changePasswordVariables,
} from "../__generated__/changePassword";
import { logUserOut } from "../apollo";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

interface FormProps {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  changePasswordError: string;
}

const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword) {
      status
      error
    }
  }
`;

const Container = styled.div`
  display: flex;
`;

const SideMenu = styled(BaseBox)`
  width: 100%;
  max-width: 240px;
  border-right: none;
`;

const Tab = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  cursor: pointer;
  :nth-child(2) {
    border-left: 3px solid ${(props) => props.theme.fontColor};
  }
`;

const TabName = styled(FatText)`
  font-size: 16px;
`;

const ContentBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  max-width: 930px;
  height: auto;
  padding: 30px 100px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const InputName = styled(FatText)`
  display: block;
  width: 120px;
  font-size: 16px;
  text-align: right;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
`;

const EditProfileInput = styled(Input)`
  width: 355px;
  margin-top: 0px;
`;

const Submit = styled(SubmitButton)`
  width: 355px;
  cursor: pointer;
`;

function ChangePassword() {
  const history = useHistory();
  const { data: userData } = useUser();

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

  const [changePassword, { loading }] = useMutation<changePassword>(
    CHANGE_PASSWORD_MUTATION,
    {
      onCompleted: (data) => {
        const { status, error } = data.changePassword;
        const { username } = userData?.me!;
        if (!status && error) {
          return setError("changePasswordError", {
            message: error,
          });
        }
        logUserOut();
        history.push(routes.home, {
          message:
            "Update successful! Please login again with your new password.",
          username,
        });
      },
    }
  );

  const onValidSubmit: SubmitHandler<changePasswordVariables> = (data) => {
    if (loading) return;
    changePassword({
      variables: { ...data },
    });
  };

  const clearChangePasswordError = () => {
    clearErrors("changePasswordError");
  };

  const { password, newPassword } = getValues();

  return (
    <>
      <PageTitle title="Change Password" />
      <Container>
        <SideMenu>
          <Tab>
            <Link to={routes.editProfile}>
              <TabName>Edit Profile</TabName>
            </Link>
          </Tab>
          <Tab>
            <TabName>Change Password</TabName>
          </Tab>
        </SideMenu>
        <ContentBox>
          <Form onSubmit={handleSubmit(onValidSubmit)}>
            <Row>
              <InputName>Old Password</InputName>
              <Wrapper>
                <EditProfileInput
                  {...register("password", {
                    required: "Old password is required.",
                  })}
                  type="password"
                  hasError={Boolean(errors.password?.message)}
                  onFocus={clearChangePasswordError}
                />
                <FormError message={errors.password?.message} />
              </Wrapper>
            </Row>
            <Row>
              <InputName>New Password</InputName>
              <Wrapper>
                <EditProfileInput
                  {...register("newPassword", {
                    required: "New password is required.",
                    minLength: {
                      value: 3,
                      message: "Password should be longer than 3 characters.",
                    },
                    validate: (currentValue) =>
                      currentValue !== password ||
                      "Please type a password that isn't your current one.",
                  })}
                  type="password"
                  hasError={Boolean(errors?.newPassword?.message)}
                  onFocus={clearChangePasswordError}
                />
                <FormError message={errors.newPassword?.message} />
              </Wrapper>
            </Row>
            <Row>
              <InputName>
                Confirm
                <br />
                New Password
              </InputName>
              <Wrapper>
                <EditProfileInput
                  {...register("confirmNewPassword", {
                    required: "Confirm new password is required.",
                    validate: (currentValue) =>
                      currentValue === newPassword ||
                      "Password does not match. Please try again.",
                  })}
                  type="password"
                  hasError={Boolean(errors.confirmNewPassword?.message)}
                  onFocus={clearChangePasswordError}
                />
                <FormError message={errors.confirmNewPassword?.message} />
              </Wrapper>
            </Row>
            <Row>
              <InputName />
              <Wrapper>
                <Submit
                  type="submit"
                  value="Submit"
                  disabled={!isValid || loading}
                />
                <FormError message={errors?.changePasswordError?.message} />
              </Wrapper>
            </Row>
          </Form>
        </ContentBox>
      </Container>
    </>
  );
}

export default ChangePassword;
