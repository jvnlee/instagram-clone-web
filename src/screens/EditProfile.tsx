import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import FormError from "../components/auth/FormError";
import SubmitButton from "../components/auth/SubmitButton";
import PageTitle from "../components/PageTitle";
import { BaseBox, FatText } from "../components/shared";
import {
  editProfile,
  editProfileVariables,
} from "../__generated__/editProfile";
import Input from "../components/auth/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

interface FormProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  bio?: string;
  editProfileError?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
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
  :first-child {
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
  width: 100px;
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

function EditProfile() {
  const history = useHistory();
  const location = useLocation<FormProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    defaultValues: {
      email: location.state.email,
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      username: location.state.username,
      bio: location.state.bio,
    },
  });

  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    update: (cache, result) => {
      const { status, error } = result.data?.editProfile!;
      const { email, firstName, lastName, username, bio } = getValues();
      if (!status && error) {
        return setError("editProfileError", {
          message: error,
        });
      }
      cache.modify({
        id: `User:${username}`,
        fields: {
          email: (prev) => email,
          firstName: (prev) => firstName,
          lastName: (prev) => lastName,
          username: (prev) => username,
          bio: (prev) => bio,
        },
      });
      history.push(`/${username}`);
    },
  });

  const onValidSubmit: SubmitHandler<editProfileVariables> = (data) => {
    if (loading) return;
    editProfile({
      variables: { ...data },
    });
  };

  return (
    <>
      <PageTitle title="Edit Profile" />
      <Container>
        <SideMenu>
          <Tab>
            <TabName>Edit Profile</TabName>
          </Tab>
          <Tab>
            <Link to={routes.changePassword}>
              <TabName>Change Password</TabName>
            </Link>
          </Tab>
        </SideMenu>
        <ContentBox>
          <Form onSubmit={handleSubmit(onValidSubmit)}>
            <Row>
              <InputName>Email</InputName>
              <EditProfileInput
                {...register("email", { required: "Email is required." })}
                type="text"
                placeholder="Email"
                // onFocus={clearCreateAccountError}
              />
              <FormError message={errors?.email?.message} />
            </Row>
            <Row>
              <InputName>First Name</InputName>
              <EditProfileInput
                {...register("firstName", {
                  required: "First name is required.",
                })}
                type="text"
                placeholder="First Name"
              />
              <FormError message={errors?.firstName?.message} />
            </Row>
            <Row>
              <InputName>Last Name</InputName>
              <EditProfileInput
                {...register("lastName")}
                type="text"
                placeholder="Last Name"
              />
            </Row>
            <Row>
              <InputName>Username</InputName>
              <EditProfileInput
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 3,
                    message: "Username should be longer than 3 characters.",
                  },
                  // validate: (currentValue) => currentValue.length >= 3,
                })}
                type="text"
                placeholder="Username"
                // onFocus={clearCreateAccountError}
              />
            </Row>
            <Row>
              <InputName>Bio</InputName>
              <EditProfileInput
                {...register("bio")}
                type="text"
                placeholder="Bio"
              />
              <FormError message={errors?.username?.message} />
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

export default EditProfile;
