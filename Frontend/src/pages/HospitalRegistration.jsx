import React, { useState, useContext } from "react";
import FormSection from "../components/FormSection";
import Input from "../components/Input/Input";
import Email from "../components/Input/Email";
import SelectCountries from "../components/SelectCountries";
import axios from "axios";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import Menu from "../components/Menu";
import { UserContext } from "../context";

function HospitalRegistration() {
  const [, setUsercontext] = useContext(UserContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState({
    country_code: "HU",
    post_code: "",
    city: "",
    address: "",
  });
  const [tax, setTax] = useState({
    tax_type: "HAS_TAX_NUMBER",
    tax_code: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [ledgerNo, setLedgerNo] = useState("");

  // const [accNo, setAccNo] = useState("");
  // const [iban, setIban] = useState("");
  // const [swift, setSwift] = useState("");

  const addHospital = async () => {
    axios({
      url: "/api/partners",
      method: "POST",
      data: {
        name,
        ledgerNo,
        address,
        emails: [email],
        phone,
        // accNo,
        // iban,
        // swift,
        taxcode: tax.tax_code,
        tax_type: tax.tax_type,
      },
    }).then((res) => {
      console.log(res.data);
      // TODO: save new hospital to user context
      setUsercontext((user) => ({
        ...user,
        hospitals: [...user.hospitals, res.data],
      }));
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center pb-12">
      <Menu />
      <h2 className="text-2xl mt-12">Hospital Registration</h2>
      <FormSection label="Hospital">
        <Input
          label="Name *"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
        <Input
          label="Customer ledger number"
          value={ledgerNo}
          onChange={({ target: { value } }) => setLedgerNo(value)}
        />
      </FormSection>
      <FormSection label="Address">
        <SelectCountries
          value={address.country_code}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, country_code: value }))
          }
        />
        <Input
          label="Postal code *"
          value={address.post_code}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, post_code: value }))
          }
        />
        <Input
          label="City *"
          value={address.city}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, city: value }))
          }
        />
        <Input
          label="Address *"
          value={address.address}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, address: value }))
          }
        />
      </FormSection>
      <FormSection label="Tax">
        <select
          name="taxtype"
          value={tax.tax_type}
          onChange={({ target: { value } }) =>
            setTax((prev) => ({ ...prev, tax_type: value }))
          }
        >
          <option value="HAS_TAX_NUMBER">Inland</option>
          <option value="FOREIGN">Foreign</option>
        </select>

        <Input
          label="Taxcode"
          value={tax.tax_code}
          onChange={({ target: { value } }) =>
            setTax((prev) => ({ ...prev, tax_code: value }))
          }
        />
      </FormSection>
      <FormSection label="Contact">
        <Email
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Input
          label="Phone"
          value={phone}
          onChange={({ target: { value } }) => setPhone(value)}
        />
      </FormSection>
      {/* <FormSection label="Bank account">
        <Input
          label="Customer ledger number"
          value={accNo}
          onChange={({ target: { value } }) => setAccNo(value)}
        />
        <Input
          label="Bank account number"
          value={iban}
          onChange={({ target: { value } }) => setIban(value)}
        />
        <Input
          label="IBAN account number"
          value={swift}
          onChange={({ target: { value } }) => setSwift(value)}
        />
      </FormSection> */}
      <div className="flex gap-4">
        <Button onClick={addHospital}>Add hospital</Button>
        <BackButton>Cancel</BackButton>
      </div>
    </div>
  );
}

export default HospitalRegistration;
