import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

interface StyledProps {
  isButton: boolean;
}

const SFacebookLogin = styled.span<StyledProps>`
  ${(props) =>
    props.isButton
      ? css`
          width: 100%;
          border: none;
          border-radius: 3px;
          margin-top: 20px;
          background-color: ${(props) => props.theme.accent};
          color: white;
          text-align: center;
          padding: 6px 0px;
          font-weight: 600;
          font-size: 18px;
          align-items: center;
          span {
            margin-left: 10px;
            font-size: 14px;
          }
        `
      : css`
          color: #385285;
          span {
            margin-left: 10px;
            font-weight: 600;
          }
        `}
`;

function FacebookLogin({ isButton }: StyledProps) {
  return (
    <SFacebookLogin isButton={isButton}>
      <FontAwesomeIcon icon={faFacebookSquare} />
      <span>Log in with Facebook</span>
    </SFacebookLogin>
  );
}

export default FacebookLogin;
