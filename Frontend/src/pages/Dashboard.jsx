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
      Dashboard
      <Button onClick={() => history.push("/hospital-registration")}>
        Add hospital
      </Button>
      <HospitalList />
    </div>
  );
}

export default Dashboard;
