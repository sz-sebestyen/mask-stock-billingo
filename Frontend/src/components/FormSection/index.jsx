import React from "react";

function FormSection({ children, label }) {
  return (
    <div>
      <div>{label}</div>
      <div>{children}</div>
    </div>
  );
}

export default FormSection;
