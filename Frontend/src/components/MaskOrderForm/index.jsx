import React from "react";
import Masks from "../Input/Masks";
import Button from "../Button";

function MaskOrderForm() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Masks />
      <Button>Order masks</Button>
    </div>
  );
}

export default MaskOrderForm;
