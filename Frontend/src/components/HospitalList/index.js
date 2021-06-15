import React from "react";
import HospitalCard from "../HospitalCard";

function HospitalList() {
  return (
    <ul>
      <HospitalCard hospital={{ id: 0 }} />
      <HospitalCard hospital={{ id: 1 }} />
      <HospitalCard hospital={{ id: 2 }} />
    </ul>
  );
}

export default HospitalList;
