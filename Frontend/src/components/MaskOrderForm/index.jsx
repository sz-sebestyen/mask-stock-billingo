import React, { useState } from "react";
import axios from "axios";
import Masks from "../Input/Masks";
import Button from "../Button";

function MaskOrderForm({ hospital, stockUpdate }) {
  const [invoiceId, setInvoiceId] = useState(null);
  const [wait, setWait] = useState(false);

  const postOrder = () => {
    setWait(true);
    axios({
      method: "POST",
      data: {
        partner_id: hospital.id,
        partner_tax_type:
          hospital.tax_type === "HAS_TAX_NUMBER" ? "huf" : "eur", //vagy "eur" - tax_type: "HAS_TAX_NUMBER" ?
        quantity: document.getElementById("orderQt").value,
      },
      // withCredentials: true,
      url: "http://localhost:3001/api/documents",
    }).then((res) => {
      console.log(res);
      setTimeout(() => {
        setWait(false);
        setInvoiceId(res.data.invoice_number);
        stockUpdate();
      }, 3000);
    });

    //+ feedback
  };

  return (
    <div className="flex flex-col gap-2 p-2 items-center">
      <Masks />
      <Button onClick={() => postOrder()}>Order masks</Button>

      {wait && "waiting for download link"}

      {invoiceId && (
        <a href={`http://localhost:3001/api/documents/download/${invoiceId}`} target="blank">
          download invoice
        </a>
      )}
    </div>
  );
}

export default MaskOrderForm;
