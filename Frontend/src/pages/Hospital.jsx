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

  return (
    <div className="flex flex-col gap-2 items-center mt-20">
      <Menu />
      <HospitalDataCard
        hospital={user?.hospitals?.find((hospital) => "" + hospital.id === id)}
      />
      <MaskOrderForm />
      <MaskStock />
      <BackButton>Back</BackButton>
    </div>
  );
}

export default Hospital;
