import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HospitalDataCard from "../components/HospitalDataCard";
import MaskOrderForm from "../components/MaskOrderForm";
import BackButton from "../components/BackButton";
import Menu from "../components/Menu";
import { UserContext } from "../context";

function Hospital() {
  const { id } = useParams();
  const [user] = useContext(UserContext);
  const hospital = user?.hospitals?.find((hospital) => "" + hospital.id === id);

  const [masks, setMasks] = useState(null);
  const url = "http://localhost:3001/maskNumber";

  const stockUpdate = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMasks(data);
        console.log(data);
      });
  };

  useEffect(() => {
    stockUpdate();
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center mt-20">
      <Menu />
      <h2 className="m-3 text-xl">Order masks for your hospital</h2>
      <HospitalDataCard hospital={hospital} />
      <MaskOrderForm hospital={hospital} stockUpdate={stockUpdate} />
      <div>
        (current stock:{" "}
        {masks !== null
          ? new Intl.NumberFormat("hu-HU").format(masks) + " pieces"
          : "loading..."}
        )
      </div>
      <BackButton>Back</BackButton>
    </div>
  );
}

export default Hospital;
