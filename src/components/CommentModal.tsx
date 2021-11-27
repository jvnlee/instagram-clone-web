import { useMutation } from "@apollo/client";
import {
  deleteComment,
  deleteCommentVariables,
} from "../__generated__/deleteComment";
import { Backdrop, ModalButton, ModalContainer } from "./shared";
import gql from "graphql-tag";

interface Props {
  id: number;
  photoId: number;
  setCommentModal: any;
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      status
      error
    }
  }
`;

function CommentModal({ id, photoId, setCommentModal }: Props) {
  const [deleteComment] = useMutation<deleteComment, deleteCommentVariables>(
    DELETE_COMMENT_MUTATION,
    {
      variables: { id: id! },
      update: (cache, result) => {
        const { status, error } = result.data?.deleteComment!;
        if (!status && error) {
          console.log(error);
        }
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNum: (prev) => prev - 1,
          },
        });
      },
    }
  );
  const handleDeleteClick = () => {
    deleteComment();
    setCommentModal(false);
  };
  const handleCancelClick = (event: any) => {
    event.stopPropagation();
    setCommentModal(false);
  };

  const modalRender = () => {
    return (
      <>
        <ModalButton>Edit</ModalButton>
        <ModalButton onClick={handleDeleteClick}>Delete</ModalButton>
        <ModalButton onClick={handleCancelClick}>Cancel</ModalButton>
      </>
    );
  };

  return (
    <Backdrop onClick={handleCancelClick}>
      <ModalContainer>{modalRender()}</ModalContainer>
    </Backdrop>
  );
}

export default CommentModal;
