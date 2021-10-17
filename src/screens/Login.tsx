import { isLoggedInVar } from "../apollo";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>Login</button>
    </>
  );
};

export default Login;
