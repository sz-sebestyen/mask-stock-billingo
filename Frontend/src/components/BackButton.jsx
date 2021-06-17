import React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

function BackButton({ children }) {
  const history = useHistory();
  return <Button onClick={() => history.goBack()}>{children}</Button>;
}

export default BackButton;
