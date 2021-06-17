import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const history = useHistory();

  return (
    <div className="flex flex-col items-center gap-4 mt-40">
      <h1 className="text-2xl mb-12">Mask Stock</h1>
      <Button onClick={() => history.push("/login")}>Login</Button>

      <Button onClick={() => history.push("/registration")}>Register</Button>
    </div>
  );
}

export default Home;
