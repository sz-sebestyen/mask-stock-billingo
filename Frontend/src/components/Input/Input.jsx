import React from "react";

function Input({ label, className, id, ...rest }) {
  return (
    <div>
      <div>
        <label className="p-1" htmlFor={label}>
          {label}
        </label>
      </div>
      <div>
        <input
          className={"p-1 rounded border-black border " + className}
          required
          id={id ? id : label}
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
