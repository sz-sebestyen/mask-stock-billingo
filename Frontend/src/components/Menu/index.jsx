import React, { useContext, useState } from "react";
import { UserContext } from "../../context";
import Button from "../Button";

function Menu() {
  const [user, setUser] = useContext(UserContext);
  const [show, setShow] = useState(false);

  return (
    <div className="fixed top-0 right-0">
      <div
        onClick={() => setShow((prev) => !prev)}
        className="ml-auto mt-2 mr-2 w-12 h-10 rounded-full p-2 flex flex-col justify-between"
      >
        <Line />
        <Line />
        <Line />
      </div>

      {show && (
        <div className="bg-white flex flex-col items-center gap-2 p-4">
          <h2>Menu</h2>
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
      )}
    </div>
  );
}

export default Menu;

const Line = () => <div className="h-1 bg-black"></div>;
