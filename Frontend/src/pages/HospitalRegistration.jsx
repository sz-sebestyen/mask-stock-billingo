import React, { useState } from "react";
import FormSection from "../components/FormSection";
import Input from "../components/Input/Input";
import Email from "../components/Input/Email";
import SelectCountries from "../components/SelectCountries";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/index";

function HospitalRegistration() {
  const [user] = useContext(UserContext);
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

  const addHospital = async () => {
    console.log(user);
    axios({
      url: "/api/partners",
      method: "POST",
      data: {
        user,
        name,
        address,
        taxcode: tax.tax_code,
        tax_type: tax.tax_type,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      HospitalRegistration
      <FormSection label="Hospital">
        <Input
          label="Name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
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
          label="Post code"
          value={address.post_code}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, post_code: value }))
          }
        />
        <Input
          label="City"
          value={address.city}
          onChange={({ target: { value } }) =>
            setAddress((prev) => ({ ...prev, city: value }))
          }
        />
        <Input
          label="Address"
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
      </FormSection>
      <div>
        <button onClick={addHospital}>Add hospital</button>
      </div>
    </div>
  );
}

export default HospitalRegistration;
