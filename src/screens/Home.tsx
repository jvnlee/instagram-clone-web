import { isLoggedInVar } from "../apollo";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Logout</button>
    </>
  );
}

export default Home;
