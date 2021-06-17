import React, { useContext } from "react";
import HospitalCard from "../HospitalCard";
import { UserContext } from "../../context";

function HospitalList() {
  const [user] = useContext(UserContext);

  return (
    <ul className="m-3 flex flex-col gap-3">
      {user?.hospitals.map((hospital) => {
        return <HospitalCard hospital={hospital} />;
      })}
    </ul>
  );
}

export default HospitalList;
