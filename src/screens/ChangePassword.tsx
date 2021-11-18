import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import SubmitButton from "../components/auth/SubmitButton";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import routes from "../routes";
import { useHistory, useLocation } from "react-router";
import gql from "graphql-tag";

interface LocationStateProps {
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($password: String) {
    editProfile(password: $password) {
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

const EditProfileInput = styled(Input)`
  width: 355px;
  margin-top: 0px;
  margin-left: 32px;
`;

const Submit = styled(SubmitButton)`
  width: 355px;
  margin-left: 32px;
  cursor: pointer;
`;

function ChangePassword() {
  const history = useHistory();
  const location = useLocation<LocationStateProps>();

  const moveToEditProfile = () => {
    history.push(routes.editProfile, {
      avatar: location.state.avatar,
      email: location.state.email,
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      username: location.state.username,
      bio: location.state.bio,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm();

  const onValidSubmit = () => {};

  return (
    <>
      <PageTitle title="Change Password" />
      <Container>
        <SideMenu>
          <Tab onClick={moveToEditProfile}>
            <TabName>Edit Profile</TabName>
          </Tab>
          <Tab>
            <TabName>Change Password</TabName>
          </Tab>
        </SideMenu>
        <ContentBox>
          <Form onSubmit={handleSubmit(onValidSubmit)}>
            <Row>
              <InputName>Old Password</InputName>
              <EditProfileInput
                {...register("oldPassword", { required: true })}
                type="text"
                // onFocus={clearCreateAccountError}
              />
              <FormError message={errors?.email?.message} />
            </Row>
            <Row>
              <InputName>New Password</InputName>
              <EditProfileInput
                {...register("newPassword", {
                  required: true,
                })}
                type="text"
              />
              <FormError message={errors?.firstName?.message} />
            </Row>
            <Row>
              <InputName>
                Confirm
                <br />
                New Password
              </InputName>
              <EditProfileInput
                {...register("confirmNewPassword", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Username should be longer than 3 characters.",
                  },
                  // validate: (currentValue) => currentValue.length >= 3,
                })}
                type="text"
                // onFocus={clearCreateAccountError}
              />
            </Row>
            <Row>
              <InputName />
              <Submit
                type="submit"
                value="Submit"
                // disabled={!isValid || loading}
              />
              {/* <FormError message={errors?.createAccountError?.message} /> */}
            </Row>
          </Form>
        </ContentBox>
      </Container>
    </>
  );
}

export default ChangePassword;
