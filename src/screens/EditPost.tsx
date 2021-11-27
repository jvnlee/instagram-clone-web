import { useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory, useLocation, useParams } from "react-router";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { Backdrop, FatText } from "../components/shared";
import { editPhoto } from "../__generated__/editPhoto";

interface LocationStateProps {
  file: string;
  caption: string | null;
  username: string;
  avatar: string;
}

interface ParamsType {
  id: string;
}

const EDIT_PHOTO_MUTATION = gql`
  mutation editPhoto($id: Int!, $caption: String!) {
    editPhoto(id: $id, caption: $caption) {
      status
      error
    }
  }
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

const ModalContainer = styled.div`
  width: 100%;
  max-width: 960px;
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
  justify-content: center;
  align-items: center;
  padding: 5px 20px 0;
`;

const ModalTitle = styled(FatText)`
  width: 900px;
  text-align: center;
  font-size: 16px;
`;

const SubmitButton = styled.input`
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

const CaptionInput = styled.textarea`
  width: 100%;
  height: 92%;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.3em;
  word-break: break-all;
  vertical-align: top;
  ::placeholder {
    font-size: 16px;
    opacity: 0.8;
  }
`;

function EditPost() {
  const history = useHistory();
  const location = useLocation<LocationStateProps>();
  const { id } = useParams<ParamsType>();
  const photoId = parseInt(id);

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      caption: location.state.caption,
    },
  });

  const [editPhoto, { loading }] = useMutation<editPhoto>(EDIT_PHOTO_MUTATION, {
    update: (cache, result) => {
      const { status, error } = result.data?.editPhoto!;
      const { caption } = getValues();
      if (!status && error) {
        console.log(error);
        return;
      }
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          caption: () => caption,
        },
      });
      history.goBack();
    },
  });

  const handleExitClick = (event: any) => {
    event.stopPropagation();
    history.goBack();
  };

  const onValidSubmit = () => {
    const { caption } = getValues();
    if (loading) return;
    editPhoto({ variables: { id: photoId, caption } });
  };

  return (
    <Backdrop onClick={handleExitClick}>
      <ExitButton onClick={handleExitClick}>
        <FontAwesomeIcon icon={faTimes} />
      </ExitButton>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <ModalTop>
            <ModalTitle>Edit Post</ModalTitle>
            <SubmitButton type="submit" value="Done" />
          </ModalTop>
          <ModalBottom>
            <PhotoContainer>
              <Photo src={location.state.file} />
            </PhotoContainer>
            <CaptionContainer>
              <UserContainer>
                <Avatar size="30" url={location.state.avatar} />
                <Username>{location.state.username}</Username>
              </UserContainer>
              <CaptionInput
                {...register("caption")}
                placeholder="Write a caption..."
                autoComplete="off"
                spellCheck="false"
              />
            </CaptionContainer>
          </ModalBottom>
        </form>
      </ModalContainer>
    </Backdrop>
  );
}

export default EditPost;
