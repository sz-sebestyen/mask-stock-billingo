import React, { useState, useEffect } from "react";
import axios from 'axios';
import HospitalCard from "../HospitalCard";

function HospitalList() {
  const [user, setUser] = useState();

  const getUser = async () => {
		const response = await axios({
			method: "GET",
			url: "/api/user"
		})
		setUser(response.data);
	};

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ul>
      {
        user?.hospitals.map(hospital => {
          return <HospitalCard hospital={ hospital } />
        })
      }
    </ul>
  );
}

export default HospitalList;
