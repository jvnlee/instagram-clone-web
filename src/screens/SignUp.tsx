import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import Button from "../components/auth/Button";
import TopBox from "../components/auth/TopBox";
import { FatLink } from "../components/shared";
import routes from "../routes";
import Logo from "../components/auth/Logo";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  line-height: 20px;
`;

const FacebookLoginButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
    margin: 1.5px 0px 0px 10px;
    font-size: 14px;
  }
`;

const SignUp = () => {
  return (
    <AuthLayout>
      <TopBox>
        <HeaderContainer>
          <Logo />
          <SubTitle>
            Sign up to see photos and videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <FacebookLoginButton>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLoginButton>
        <Separator />
        <form>
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Sign up" />
        </form>
      </TopBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};

export default SignUp;
