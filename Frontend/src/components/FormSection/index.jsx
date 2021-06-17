import React from "react";

function FormSection({ children, label }) {
  return (
    <div className="border p-2 flex flex-col gap-1">
      <div className="text-lg">{label}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default FormSection;
