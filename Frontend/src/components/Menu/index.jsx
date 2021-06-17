import React, { useContext } from "react";
import { UserContext } from "../../context";
import Button from "../Button";

function Menu() {
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      menu
      <div>Signed in as: {user.username}</div>
      <Button
        onClick={() =>
          fetch("/user/logout")
            .then((res) => res.json())
            .then((data) => setUser())
            .catch((err) => console.error(err))
        }
      >
        Logout
      </Button>
    </div>
  );
}

export default Menu;
