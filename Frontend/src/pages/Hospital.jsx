import React from "react";
import { useParams } from "react-router-dom";

function Hospital() {
  const { id } = useParams();

  return <div>Hospital {id}</div>;
}

export default Hospital;
