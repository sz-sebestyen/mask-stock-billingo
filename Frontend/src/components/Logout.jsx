import { useState, useEffect } from "react";
import axios from "axios";

export default function Logout() {
	const [username, setUsername] = useState("");

	const getUser = () => {
		axios({
			method: "get",
			data: {
				username: username,
			},
			withCredentials: true,
			url: "http://localhost:3001/user"
		}).then((res) => console.log(res));
	};

	return (
		<div>
			Logged in as {username}
			<button>Logout</button>
		</div>
	)
};