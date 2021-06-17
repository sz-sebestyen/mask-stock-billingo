import React, { useRef } from "react";
import Input from "./Input";

function Masks(props) {

  // const orderQtRef = useRef(null);

  return (
    <Input
      type="number"
      label="Number of masks:"
      {...props}
      min="50"
      max="1000"
      step="10"
      defaultValue={50}
      className="w-full"
      // ref={orderQtRef}
      id="orderQt"
    />
  );
}

export default Masks;
