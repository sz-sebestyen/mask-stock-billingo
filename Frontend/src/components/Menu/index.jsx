import React, { useContext } from "react";
import { UserContext } from "../../context";

function Menu() {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      menu
      <div>Signed in as: {user.username}</div>
      <button
        onClick={() =>
          fetch("/user/logout")
            .then((res) => res.json())
            .then((data) => setUser())
            .catch((err) => console.error(err))
        }
      >
        Logout
      </button>
    </div>
  );
}

export default Menu;
