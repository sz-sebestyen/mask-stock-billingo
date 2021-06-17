import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../Button";

function HospitalCard({ hospital }) {
  const history = useHistory();

  return (
    <li className="flex justify-between items-center border p-2">
      <span>{hospital.name}</span>
      <Button onClick={() => history.push(`/hospital/${hospital.id}`)}>
        {"Order >>"}
      </Button>
    </li>
  );
}

export default HospitalCard;
