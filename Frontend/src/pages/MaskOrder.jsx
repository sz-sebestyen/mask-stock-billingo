import React from "react";
import { useParams } from "react-router-dom";

function MaskOrder() {
  const { id } = useParams();

  return <div>MaskOrder {id}</div>;
}

export default MaskOrder;
