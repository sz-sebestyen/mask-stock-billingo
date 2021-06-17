import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import HospitalDataCard from "../components/HospitalDataCard";
import MaskOrderForm from "../components/MaskOrderForm";
import BackButton from "../components/BackButton";
import MaskStock from "../components/MaskStock";
import Menu from "../components/Menu";
import { UserContext } from "../context";

function Hospital() {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const hospital = user?.hospitals?.find((hospital) => "" + hospital.id === id);

  return (
    <div className="flex flex-col gap-2 items-center mt-20">
      <Menu />
      <h2 className="m-3 text-xl">Order masks for your hospital</h2>
      <HospitalDataCard
        hospital={hospital}
      />
      <MaskOrderForm
        hospital={hospital}
      />
      <MaskStock />
      <BackButton>Back</BackButton>
    </div>
  );
}

export default Hospital;
