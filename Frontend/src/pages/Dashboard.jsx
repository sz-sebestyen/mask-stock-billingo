import React from "react";
import HospitalList from "../components/HospitalList";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const history = useHistory();

  return (
    <div>
      Dashboard
      <button onClick={() => history.push("/hospital-registration")}>
        Add hospital
      </button>
      <HospitalList />
    </div>
  );
}

export default Dashboard;
