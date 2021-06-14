import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context";

function UserStateProtection({ children, reversed }) {
  const [user] = useContext(UserContext);

  const shouldRedirect = reversed ? user : !user;

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}

export default UserStateProtection;
