import React, { useState } from "react";
import { Redirect } from "react-router-dom";

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
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Registration;
