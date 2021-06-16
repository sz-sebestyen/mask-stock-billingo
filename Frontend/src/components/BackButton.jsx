import React from "react";
import { useHistory } from "react-router-dom";

function BackButton({ children }) {
  const history = useHistory();
  return <button onClick={() => history.goBack()}>{children}</button>;
}

export default BackButton;
