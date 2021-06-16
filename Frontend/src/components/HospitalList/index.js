import React, { useState, useEffect } from "react";
import axios from 'axios';
import HospitalCard from "../HospitalCard";

function HospitalList() {
  const [user, setUser] = useState();

  const getUser = () => {
		axios({
			method: "GET",
			url: "/api/user"
		}).then((res) => {
			console.log(res);
			console.log(res.data);
			setUser(res.data);
		});
	};

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ul>
      <HospitalCard hospital={{ id: 0 }} />
      <HospitalCard hospital={{ id: 1 }} />
      <HospitalCard hospital={{ id: 2 }} />
    </ul>
  );
}

export default HospitalList;
