import { logUserOut } from "../apollo";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => logUserOut()}>Logout</button>
    </>
  );
}

export default Home;
