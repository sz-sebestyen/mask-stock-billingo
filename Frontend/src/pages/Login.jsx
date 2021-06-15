import React, { useContext } from "react";
import { UserContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";

function Login() {
  let history = useHistory();
  let location = useLocation();
  const [, setUser] = useContext(UserContext);

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    // TODO: POST req to /login
    setUser(true);
    history.replace(from);
  };

  return (
    <div>
      Login
      <button onClick={login}>login</button>
    </div>
  );
}

export default Login;
