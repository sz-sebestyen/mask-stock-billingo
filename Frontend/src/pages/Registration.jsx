import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Email from "../components/Input/Email";
import Password from "../components/Input/Password";
import PasswordRepeat from "../components/Input/PasswordRepeat";
import axios from "axios";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

function Registration() {
  const [hasRegistered, setHasRegistered] = useState(false);

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordRep, setRegPasswordRep] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const register = () => {
    if (regPassword !== regPasswordRep) return;
    setIsWaiting(true);

    axios({
      method: "POST",
      data: {
        username: regUsername,
        password: regPassword,
      },
      withCredentials: true,
      url: "/register",
    })
      .then((res) => {
        console.log(res);
        setHasRegistered(true);
      })
      .finally(() => setIsWaiting(false));
  };

  if (hasRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="flex flex-col gap-4 items-center mt-20">
      <h2 className="text-2xl">Registration</h2>
      <Email onChange={({ target: { value } }) => setRegUsername(value)} />
      <Password onChange={({ target: { value } }) => setRegPassword(value)} />
      <PasswordRepeat
        onChange={({ target: { value } }) => setRegPasswordRep(value)}
      />
      {!isWaiting && (
        <div className="flex gap-4">
          <Button onClick={register}>Register</Button>
          <BackButton>Back</BackButton>
        </div>
      )}
    </div>
  );
}

export default Registration;
