import React from "react";
import HospitalList from "../components/HospitalList";
import { useHistory } from "react-router-dom";
import Menu from "../components/Menu";
import Button from "../components/Button";

function Dashboard() {
  const history = useHistory();

  return (
    <div>
      <Menu />
      <h2 className="m-3 text-xl">Dashboard</h2>

      <div className="m-3">
        <Button onClick={() => history.push("/hospital-registration")}>
          Add hospital
        </Button>
      </div>
      <HospitalList />
    </div>
  );
}

export default Dashboard;
