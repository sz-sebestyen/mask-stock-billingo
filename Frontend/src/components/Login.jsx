import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const login = () => {
		axios({
			method: "post",
			data: {
				username: loginUsername,
				password: loginPassword
			},
			withCredentials: true,
			url: "http://localhost:3001/login"
		}).then((res) => console.log(res));
	};

	return (
		<div>
			Username: <input type="text" id="" placeholder="username"
				onChange={e => setLoginUsername(e.target.value)}
			/>
			Password: <input type="password" id="" placeholder="password"
				onChange={e => setLoginPassword(e.target.value)}
			/>
			<button onClick={login}>Login</button>
		</div>
	)
};