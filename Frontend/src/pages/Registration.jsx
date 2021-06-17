import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Email from "../components/Input/Email";
import Password from "../components/Input/Password";
import PasswordRepeat from "../components/Input/PasswordRepeat";
import axios from "axios";
import Button from "../components/Button";

function Registration() {
  const [hasRegistered, setHasRegistered] = useState(false);

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordRep, setRegPasswordRep] = useState("");

  const register = () => {
    if (regPassword !== regPasswordRep) return;

    axios({
      method: "POST",
      data: {
        username: regUsername,
        password: regPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then((res) => {
      console.log(res);
      setHasRegistered(true);
    });
    // .finally(() => setShowReg(false));
  };

  if (hasRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      Registration
      <Email onChange={({ target: { value } }) => setRegUsername(value)} />
      <Password onChange={({ target: { value } }) => setRegPassword(value)} />
      <PasswordRepeat
        onChange={({ target: { value } }) => setRegPasswordRep(value)}
      />
      <Button onClick={register}>Register</Button>
    </div>
  );
}

export default Registration;
