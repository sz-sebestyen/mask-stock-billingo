import React from "react";
import HospitalList from "../components/HospitalList";
import { useHistory } from "react-router-dom";
import Menu from "../components/Menu";

function Dashboard() {
  const history = useHistory();

  return (
    <div>
      <Menu />
      Dashboard
      <button onClick={() => history.push("/hospital-registration")}>
        Add hospital
      </button>
      <HospitalList />
    </div>
  );
}

export default Dashboard;
