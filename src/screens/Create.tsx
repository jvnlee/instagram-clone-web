import { useMutation } from "@apollo/client";
import {
  faArrowLeft,
  faExclamation,
  faPhotoVideo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { Backdrop, FatText } from "../components/shared";
import useUser from "../hooks/useUser";
import gql from "graphql-tag";
import { uploadPhoto } from "../__generated__/uploadPhoto";
import { useHistory } from "react-router";
import routes from "../routes";
import { FEED_PHOTO_FRAGMENT } from "../fragments";

interface ModalContainerProps {
  animate: boolean;
}

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhotoFragment
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;

const ExitButton = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 20px;
  right: 40px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  width: 100%;
  max-width: ${(props) => (props.animate ? "960px" : "620px")};
  height: 670px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  overflow: hidden;
  transition: width 1s linear;
`;

const ModalTop = styled.div`
  width: 100%;
  max-width: 960px;
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 0;
`;

const PrevButton = styled.div`
  color: ${(props) => props.theme.fontColor};
  cursor: pointer;
`;

const ModalTitle = styled(FatText)`
  width: 620px;
  text-align: center;
  font-size: 16px;
`;

const NextButton = styled(FatText)`
  color: ${(props) => props.theme.accent};
  cursor: pointer;
`;

const ShareButton = styled.input`
  color: ${(props) => props.theme.accent};
  cursor: pointer;
  font-weight: 600;
`;

const ModalBottom = styled.div`
  width: 100%;
  height: 620px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  margin-bottom: 40px;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 620px;
  height: 100%;
  overflow: hidden;
  background-color: #000000;
`;

const Photo = styled.img`
  width: auto;
  height: 100%;
`;

const CaptionContainer = styled.div`
  width: 340px;
  height: 100%;
  padding: 20px;
`;

const UserContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  font-size: 16px;
  margin-left: 10px;
`;

const CaptionInput = styled.input`
  width: 100%;
  margin-top: 20px;
  font-weight: 400;
  ::placeholder {
    font-size: 16px;
    opacity: 0.8;
  }
`;

const Guide = styled.h2`
  font-weight: 300;
  font-size: 22px;
  margin-top: 16px;
`;

const Label = styled.label`
  width: 180px;
  border: none;
  border-radius: 3px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
`;

const PhotoInput = styled.input`
  display: none;
`;

function Create() {
  const history = useHistory();
  const { data: userData } = useUser();
  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [animate, setAnimate] = useState(false);
  const [valid, setValid] = useState(true);

  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
  });

  const [uploadPhoto, { loading }] = useMutation<uploadPhoto>(
    UPLOAD_PHOTO_MUTATION,
    {
      update: (cache, result) => {
        const { uploadPhoto } = result.data!;
        if (uploadPhoto?.id) {
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              seeFeed: (prev) => [uploadPhoto, ...prev],
            },
          });
          cache.modify({
            id: `User:${userData?.me?.username}`,
            fields: {
              photos: (prev) => [uploadPhoto, ...prev],
            },
          });
          history.push(routes.home);
        }
      },
    }
  );

  const handleExitClick = (event: any) => {
    event.stopPropagation();
    history.goBack();
  };

  const handlePrevClick = () => {
    setValue("photo", null);
    setValue("caption", null);
    setPhoto("");
    setPhotoFile(null);
    setAnimate(false);
  };

  const handleNextClick = () => {
    setAnimate(true);
  };

  const onValidSubmit = () => {
    const { caption } = getValues();
    if (loading) return;
    uploadPhoto({
      variables: {
        file: photoFile,
        caption,
      },
    });
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const validateFile = (file: any) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (validTypes.includes(file.type)) {
      return true;
    }
    return false;
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setPhoto(URL.createObjectURL(droppedFile));
      setPhotoFile(droppedFile);
    } else {
      setValid(false);
    }
  };

  return (
    <Backdrop onClick={handleExitClick}>
      <ExitButton onClick={handleExitClick}>
        <FontAwesomeIcon icon={faTimes} />
      </ExitButton>
      <ModalContainer
        animate={animate}
        onClick={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <ModalTop>
            {photo ? (
              <PrevButton onClick={handlePrevClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </PrevButton>
            ) : null}
            <ModalTitle>Create New Post</ModalTitle>
            {photo ? (
              animate ? (
                <ShareButton type="submit" value="Share" />
              ) : (
                <NextButton onClick={handleNextClick}>Next</NextButton>
              )
            ) : null}
          </ModalTop>
          <ModalBottom>
            {photo ? (
              animate ? (
                <>
                  <PhotoContainer>
                    <Photo src={photo} />
                  </PhotoContainer>
                  <CaptionContainer>
                    <UserContainer>
                      <Avatar size="30" url={userData?.me?.avatar} />
                      <Username>{userData?.me?.username}</Username>
                    </UserContainer>
                    <CaptionInput
                      {...register("caption")}
                      type="text"
                      placeholder="Write a caption..."
                      autoComplete="off"
                    />
                  </CaptionContainer>
                </>
              ) : (
                <PhotoContainer>
                  <Photo src={photo} />
                </PhotoContainer>
              )
            ) : (
              <Wrapper
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {valid ? (
                  <>
                    <FontAwesomeIcon icon={faPhotoVideo} size="3x" />
                    <Guide>Drag photos and videos here</Guide>
                    <Label htmlFor="photo">Select from computer</Label>
                    <PhotoInput
                      {...register("photo")}
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faExclamation} size="3x" />
                    <Guide>This file is not supported</Guide>
                    <Label htmlFor="photo">Select other files</Label>
                    <PhotoInput
                      {...register("photo")}
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleChange}
                    />
                  </>
                )}
              </Wrapper>
            )}
          </ModalBottom>
        </form>
      </ModalContainer>
    </Backdrop>
  );
}

export default Create;
