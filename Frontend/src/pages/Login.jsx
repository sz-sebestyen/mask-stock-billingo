import React, { useContext, useState } from "react";
import { UserContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";
import Email from "../components/Input/Email";
import Password from "../components/Input/Password";
import axios from "axios";

function Login() {
  let history = useHistory();
  let location = useLocation();
  const [, setUser] = useContext(UserContext);

  const { from } = location.state || { from: { pathname: "/" } };

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res);
      setUser(res.data.user);
      history.replace(from);
    });
    // .finally(() => setLoggedIn(true));
  };

  return (
    <div>
      Login
      <Email onChange={({ target: { value } }) => setLoginUsername(value)} />
      <Password onChange={({ target: { value } }) => setLoginPassword(value)} />
      <button onClick={login}>login</button>
    </div>
  );
}

export default Login;
