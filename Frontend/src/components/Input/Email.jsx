import React from "react";
import Input from "./Input";

function EmailInput(props) {
  return <Input {...props} type="email" label="Email" />;
}

export default EmailInput;
