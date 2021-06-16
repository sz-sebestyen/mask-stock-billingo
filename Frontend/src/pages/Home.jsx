import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <div>
      Home
      <button onClick={() => history.push("/login")}>login</button>
      <button onClick={() => history.push("/registration")}>register</button>
    </div>
  );
}

export default Home;
