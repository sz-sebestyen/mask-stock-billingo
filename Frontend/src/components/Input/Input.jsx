import React from "react";

function Input({ label, ...rest }) {
  return (
    <div>
      <div>
        <label htmlFor={label}>{label}</label>
      </div>
      <div>
        <input
          required
          id={label}
          placeholder={label}
          {...rest}
          onBlur={(event) => {
            event.target.reportValidity();
          }}
        />
      </div>
    </div>
  );
}

export default Input;
