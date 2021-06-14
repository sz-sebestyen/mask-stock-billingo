import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context";

function UserStateProtection({ children }) {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}

export default UserStateProtection;
