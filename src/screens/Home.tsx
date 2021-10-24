import { useHistory } from "react-router";
import { logUserOut } from "../apollo";

function Home() {
  const history = useHistory();
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Logout</button>
    </>
  );
}

export default Home;
