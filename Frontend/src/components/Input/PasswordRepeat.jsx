import React from "react";
import Input from "./Input";

function Password(props) {
  return <Input {...props} type="password" label="Repeat password" />;
}

export default Password;
