import React from "react";
import { useHistory } from "react-router-dom";

function HospitalCard({ hospital }) {
  const history = useHistory();

  return (
    <li>
      {hospital.name}
      <button onClick={() => history.push(`/hospital/${hospital.id}`)}>
        {"Order >>"}
      </button>
    </li>
  );
}

export default HospitalCard;
