import React from "react";
import { useParams } from "react-router-dom";
import HospitalDataCard from "../components/HospitalDataCard";
import MaskOrderForm from "../components/MaskOrderForm";

function Hospital() {
  const { id } = useParams();

  return (
    <div>
      Hospital {id}
      <HospitalDataCard />
      <MaskOrderForm />
    </div>
  );
}

export default Hospital;
