import React from "react";
import { useParams } from "react-router-dom";
import HospitalDataCard from "../components/HospitalDataCard";
import MaskOrderForm from "../components/MaskOrderForm";
import BackButton from "../components/BackButton";
import MaskStock from "../components/MaskStock";

function Hospital() {
  const { id } = useParams();

  return (
    <div>
      Hospital {id}
      <HospitalDataCard />
      <MaskOrderForm />
      <MaskStock />
      <BackButton>Back</BackButton>
    </div>
  );
}

export default Hospital;
