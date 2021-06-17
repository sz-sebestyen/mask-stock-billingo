import React, { useContext, useState } from "react";
import { UserContext } from "../context";
import { useHistory, useLocation } from "react-router-dom";
import Email from "../components/Input/Email";
import Password from "../components/Input/Password";
import axios from "axios";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

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
    <div className="flex flex-col gap-4 items-center mt-20">
      <h2 className="text-2xl">Login</h2>
      <Email onChange={({ target: { value } }) => setLoginUsername(value)} />
      <Password onChange={({ target: { value } }) => setLoginPassword(value)} />

      <div className="flex gap-4">
        <Button onClick={login}>Sign In</Button>
        <BackButton>Back</BackButton>
      </div>
    </div>
  );
}

export default Login;
