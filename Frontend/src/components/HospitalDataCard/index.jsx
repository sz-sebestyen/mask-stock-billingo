import React from "react";

function HospitalDataCard({ hospital }) {
  const Haddress = hospital.address;

  return (
    <div className="border p-2">
      <h3>Hospital data:</h3>
      <div>Name: {hospital.name}</div>
      <div>
        Address: {Haddress.country_code}, {Haddress.post_code}, {Haddress.city},{" "}
        {Haddress.address}
      </div>
      <div>Email(s): {hospital.emails.join(", ")}</div>
      <div>Taxcode: {hospital.taxcode}</div>
    </div>
  );
}

export default HospitalDataCard;
