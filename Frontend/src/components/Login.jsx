import { useState, useEffect } from "react";
import axios from "axios";
import Logout from "./Logout";
import "./RegLogin.css";

// TODO: login gombra login eltűnik -> logout

export default function Login() {
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const login = () => {
		axios({
			method: "POST",
			data: {
				username: loginUsername,
				password: loginPassword
			},
			withCredentials: true,
			url: "http://localhost:3001/login"
		})
			.then((res) => console.log(res))
			.finally(() => setLoggedIn(true));
	};

	return (
		<>
			{loggedIn ? <Logout /> :
				<div>
					<b>Sign in: </b>
					Username: <input type="text" id="loginId" placeholder="username"
						onChange={e => setLoginUsername(e.target.value)}
					/>
					Password: <input type="password" id="loginPw" placeholder="password"
						onChange={e => setLoginPassword(e.target.value)}
					/>
					<button onClick={login}>Login</button>
				</div>
			}

		</>
	)
};