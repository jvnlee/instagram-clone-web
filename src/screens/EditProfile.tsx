import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
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
import routes from "../routes";
import Avatar from "../components/Avatar";
import useUser from "../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface FormProps {
  avatar: any;
  email: string;
  firstName: string;
  lastName: string | null;
  username: string;
  bio: string | null;
  editProfileError: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      bio: $bio
      avatar: $avatar
    ) {
      status
      error
      avatarUrl
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
  :first-child {
    margin-left: 60px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  line-height: 1.8em;
`;

const Username = styled.span`
  font-size: 20px;
`;

const Label = styled.label`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  cursor: pointer;
`;

const AvatarInput = styled.input`
  display: none;
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
  const { data: userData } = useUser();

  let values = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
  };

  const [avatarBg, setAvatarBg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: {
      ...values,
    },
  });

  useEffect(() => {
    values = {
      email: userData?.me?.email!,
      firstName: userData?.me?.firstName!,
      lastName: userData?.me?.lastName!,
      username: userData?.me?.username!,
      bio: userData?.me?.bio!,
    };
    reset(values);
    setAvatarBg(userData?.me?.avatar!);
  }, [userData?.me]);

  const [editProfile, { loading }] = useMutation<editProfile>(
    EDIT_PROFILE_MUTATION,
    {
      update: (cache, result) => {
        const { status, error, avatarUrl } = result.data?.editProfile!;
        const { email, firstName, lastName, username, bio } = getValues();
        if (!status && error) {
          return setError("editProfileError", {
            message: error,
          });
        }
        cache.modify({
          id: `User:${userData?.me?.username}`,
          fields: {
            avatar: (prev) => (avatarUrl ? avatarUrl : prev),
            email: () => email,
            firstName: () => firstName,
            lastName: () => lastName,
            username: () => username,
            bio: () => bio,
          },
        });
        history.push(`/${username}`);
      },
    }
  );

  const [avatarFile, setAvatarFile] = useState();

  const handleChange = async (event: any) => {
    const file = event.target.files[0];
    setAvatarBg(URL.createObjectURL(file));
    setAvatarFile(file);
  };

  const onValidSubmit: SubmitHandler<editProfileVariables> = (data) => {
    if (loading) return;
    const { email, firstName, lastName, username, bio } = getValues();
    editProfile({
      variables: {
        avatar: avatarFile,
        firstName,
        lastName,
        username,
        email,
        bio,
      },
    });
  };

  const clearEditProfileError = () => {
    clearErrors("editProfileError");
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
              <Avatar size="40" url={avatarBg} />
              <Wrapper>
                <Username>{userData?.me?.username}</Username>
                <Label htmlFor="avatar">Change Profile Photo</Label>
                <AvatarInput
                  {...register("avatar")}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </Wrapper>
            </Row>
            <Row>
              <InputName>Email</InputName>
              <EditProfileInput
                {...register("email", {
                  required: "Email is required.",
                  validate: (v) => v.length > 0,
                })}
                type="text"
                placeholder="Email"
                hasError={Boolean(errors.email?.message)}
              />
              <FormError message={errors.email?.message} />
            </Row>
            <Row>
              <InputName>First Name</InputName>
              <EditProfileInput
                {...register("firstName", {
                  required: "First name is required.",
                })}
                type="text"
                placeholder="First Name"
                hasError={Boolean(errors.firstName?.message)}
              />
              <FormError message={errors.firstName?.message} />
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
                  validate: (v) => v.length >= 3,
                })}
                type="text"
                placeholder="Username"
                hasError={Boolean(errors.username?.message)}
                onFocus={clearEditProfileError}
              />
              <FormError message={errors?.username?.message} />
            </Row>
            <Row>
              <InputName>Bio</InputName>
              <EditProfileInput
                {...register("bio")}
                type="text"
                placeholder="Bio"
              />
            </Row>
            <Row>
              <InputName />
              <Submit
                type="submit"
                value="Submit"
                disabled={!isValid || loading}
              />
              <FormError message={errors?.editProfileError?.message} />
            </Row>
          </Form>
        </ContentBox>
      </Container>
    </>
  );
}

export default EditProfile;
