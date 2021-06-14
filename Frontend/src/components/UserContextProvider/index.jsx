import React, { useState } from "react";
import { UserContext } from "../../context";

function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  const login = async (email, password) => {
    // TODO: POST request to api login
    setUser(true);
  };

  return (
    <UserContext.Provider value={[user, login]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
