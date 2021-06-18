import React, { useState } from "react";
import axios from "axios";
import Masks from "../Input/Masks";
import Button from "../Button";

function MaskOrderForm({ hospital, stockUpdate }) {
  const [invoiceId, setInvoiceId] = useState(null);

  const postOrder = () => {
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
      setInvoiceId(res.data.invoice_number);
      stockUpdate();
    });

    //+ feedback
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <Masks />
      <Button onClick={() => postOrder()}>Order masks</Button>

      {invoiceId && (
        <a href={`http://localhost:3001/api/documents/download/${invoiceId}`}>
          download invoice
        </a>
      )}
    </div>
  );
}

export default MaskOrderForm;
