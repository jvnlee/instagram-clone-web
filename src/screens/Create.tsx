import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { FatText } from "../components/shared";

interface ModalContainerProps {
  animate: boolean;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExitButton = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  ${(props) =>
    props.animate
      ? css`
          width: 100%;
          max-width: 960px;
          height: 670px;
          background-color: ${(props) => props.theme.boxColor};
          border-radius: 15px;
          overflow: hidden;
        `
      : css`
          width: 100%;
          max-width: 620px;
          height: 670px;
          background-color: ${(props) => props.theme.boxColor};
          border-radius: 15px;
          overflow: hidden;
        `};
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

const Photo = styled.img`
  width: auto;
  height: 100%;
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
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
  });

  const handlePrevClick = () => {
    setValue("photo", null);
    setPhoto("");
    setPhotoFile(null);
  };

  const handleNextClick = () => {
    setAnimate(true);
  };

  const handleChange = (event: any) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
  };

  const [photo, setPhoto] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [animate, setAnimate] = useState(false);

  return (
    <Background>
      <ExitButton>
        <FontAwesomeIcon icon={faXbox} />
      </ExitButton>
      <ModalContainer animate={animate}>
        <ModalTop>
          {photo ? (
            <PrevButton onClick={handlePrevClick}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </PrevButton>
          ) : null}
          <ModalTitle>Create New Post</ModalTitle>
          {photo ? (
            <NextButton onClick={handleNextClick}>Next</NextButton>
          ) : null}
        </ModalTop>
        <ModalBottom>
          {photo ? (
            <Photo src={photo} />
          ) : (
            <Wrapper>
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
            </Wrapper>
          )}
        </ModalBottom>
      </ModalContainer>
    </Background>
  );
}

export default Create;
