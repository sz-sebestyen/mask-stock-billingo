import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Email from "../components/Input/Email";
import Password from "../components/Input/Password";
import PasswordRepeat from "../components/Input/PasswordRepeat";

function Registration() {
  const [hasRegistered, setHasRegistered] = useState(false);

  const register = async () => {
    // POST request to api/registration
    setHasRegistered(true);
  };

  if (hasRegistered) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      Registration
      <Email />
      <Password />
      <PasswordRepeat />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Registration;
