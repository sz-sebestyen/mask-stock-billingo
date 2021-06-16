import React from "react";
import FormSection from "../components/FormSection";
import Input from "../components/Input/Input";
import Email from "../components/Input/Email";
import SelectCountries from "../components/SelectCountries";

function HospitalRegistration() {
  return (
    <div>
      HospitalRegistration
      <FormSection label="Hospital">
        <Input label="Name" />
      </FormSection>
      <FormSection label="Address">
        <SelectCountries />
        <Input label="Post code" />
        <Input label="City" />
        <Input label="Address" />
      </FormSection>
      <FormSection label="Tax">
        <input type="radio" id="hun" name="taxtype" value="HAS_TAX_NUMBER" />
        <label htmlFor="hun">Hungarian</label>
        <br />
        <input type="radio" id="foreign" name="taxtype" value="FOREIGN" />
        <label htmlFor="foreign">Foreign</label>
        <br />

        <Input label="Taxcode" />
      </FormSection>
      <FormSection label="Contact">
        <Email />
      </FormSection>
    </div>
  );
}

export default HospitalRegistration;
