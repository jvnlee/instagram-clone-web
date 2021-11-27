import { useMutation, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { DeleteMenuVar, PhotoMenuVar } from "../apollo";
import { Backdrop, FatText, ModalButton, ModalContainer } from "./shared";
import gql from "graphql-tag";
import { deletePhoto } from "../__generated__/deletePhoto";
import { useHistory, useLocation } from "react-router";
import routes from "../routes";
import { Link } from "react-router-dom";

interface Props {
  photoId: number;
  file: string;
  caption: string;
  username: string;
  avatar: string;
}

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      status
      error
    }
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

function PhotoModal({ photoId, avatar, username, file, caption }: Props) {
  const history = useHistory();
  const location = useLocation();
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
    PhotoMenuVar(false);
    DeleteMenuVar(false);
  };

  const modalRender = () => {
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
        <Link
          to={{
            pathname: `/edit/${photoId}`,
            state: { background: location, avatar, username, file, caption },
          }}
          onClick={handleCancelClick}
        >
          <ModalButton>Edit</ModalButton>
        </Link>
        <ModalButton onClick={handleDeleteClick}>Delete</ModalButton>
        <ModalButton onClick={handleCancelClick}>Cancel</ModalButton>
      </>
    );
  };

  return (
    <Backdrop>
      <ModalContainer>{modalRender()}</ModalContainer>
    </Backdrop>
  );
}

export default PhotoModal;
