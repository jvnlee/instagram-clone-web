import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import FormError from "../components/auth/FormError";
import SubmitButton from "../components/auth/SubmitButton";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
import {
  editProfile,
  editProfileVariables,
} from "../__generated__/editProfile";

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

function EditProfile() {
  const { data: userData, loading: userLoading } = useUser();
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
      <form onSubmit={handleSubmit(onValidSubmit)}>
        <input
          {...register("email", { required: "Email is required." })}
          type="text"
          placeholder="Email"
          // onFocus={clearCreateAccountError}
        />
        <FormError message={errors?.email?.message} />
        <input
          {...register("firstName", { required: "First name is required." })}
          type="text"
          placeholder="First Name"
        />
        <FormError message={errors?.firstName?.message} />
        <input {...register("lastName")} type="text" placeholder="Last Name" />
        <input
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
        <input {...register("bio")} type="text" placeholder="Bio" />
        <FormError message={errors?.username?.message} />
        <SubmitButton
          type="submit"
          value="Submit"
          // disabled={!isValid || loading}
        />
        {/* <FormError message={errors?.createAccountError?.message} /> */}
      </form>
    </>
  );
}

export default EditProfile;
