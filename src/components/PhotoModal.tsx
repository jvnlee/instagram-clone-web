import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { DeleteMenuVar, PhotoMenuVar } from "../apollo";
import { Backdrop, FatText } from "./shared";
import gql from "graphql-tag";
import { deletePhoto } from "../__generated__/deletePhoto";
import { useHistory } from "react-router";
import routes from "../routes";

interface Props {
  photoId: number;
}

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      status
      error
    }
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: auto;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 15px;
  overflow: hidden;
  transition: width 1s linear;
`;

const ModalButton = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  font-weight: 600;
  cursor: pointer;
  :nth-child(2) {
    color: #ff0000;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 106px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled(FatText)`
  font-size: 18px;
  margin-bottom: 15px;
`;

const SubMessage = styled(FatText)`
  opacity: 0.4;
`;

function PhotoModal({ photoId }: Props) {
  const history = useHistory();
  const deleteMenu = useReactiveVar(DeleteMenuVar);
  const handleCancelClick = (event: any) => {
    event.stopPropagation();
    PhotoMenuVar(false);
    DeleteMenuVar(false);
  };
  const handleDeleteClick = () => {
    DeleteMenuVar(true);
  };

  const [deletePhoto, { loading }] = useMutation<deletePhoto>(
    DELETE_PHOTO_MUTATION,
    {
      update: (cache, result) => {
        const { status, error } = result.data?.deletePhoto!;
        if (!status && error) {
          console.log(error);
          return;
        }
        cache.evict({
          id: `Photo:${photoId}`,
        });
        history.push(routes.home);
      },
    }
  );

  const deletePhotoFunc = () => {
    if (loading) return;
    deletePhoto({
      variables: {
        id: photoId,
      },
    });
  };

  const Render = () => {
    if (deleteMenu) {
      return (
        <>
          <MessageContainer>
            <Message>Delete Post?</Message>
            <SubMessage>Are you sure you want to delete this post?</SubMessage>
          </MessageContainer>
          <ModalButton onClick={deletePhotoFunc}>Delete</ModalButton>
          <ModalButton onClick={handleCancelClick}>Cancel</ModalButton>
        </>
      );
    }
    return (
      <>
        <ModalButton>Edit</ModalButton>
        <ModalButton onClick={handleDeleteClick}>Delete</ModalButton>
        <ModalButton onClick={handleCancelClick}>Cancel</ModalButton>
      </>
    );
  };

  return (
    <Backdrop>
      <ModalContainer>{Render()}</ModalContainer>
    </Backdrop>
  );
}

export default PhotoModal;
