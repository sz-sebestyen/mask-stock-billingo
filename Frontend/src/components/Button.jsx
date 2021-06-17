import React from "react";

function Button({ children, ...props }) {
  return (
    <button {...props} className="border border-black rounded px-4 py-2">
      {children}
    </button>
  );
}

export default Button;
