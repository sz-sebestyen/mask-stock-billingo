import { useState, useEffect } from "react";
import axios from "axios";
import "./RegLogin.css";

export default function Logout() {
	const [data, setData] = useState(null);

	const getUser = () => {
		axios({
			method: "GET",
			withCredentials: true,
			url: "http://localhost:3001/user"
		}).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div>
			{data &&
				<span>Logged in as {data.username}</span>}

			<button>Logout</button>
		</div>
	)
};