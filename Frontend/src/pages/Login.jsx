import React, { useContext } from "react";
import { UserContext } from "../context";

function Login() {
  const [, login] = useContext(UserContext);

  return (
    <div>
      Login
      <button onClick={() => login()}>login</button>
    </div>
  );
}

export default Login;
