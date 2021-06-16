import React, { useState, useEffect } from "react";
import { UserContext } from "../../context";

function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const res = await fetch("/user");
      const json = await res.json();
      setUser(json.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
