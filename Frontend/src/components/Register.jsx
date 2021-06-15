import { useState, useEffect } from "react";
// import RegModal from "./RegModal";
import axios from "axios";
import "./RegLogin.css";

export default function Register() {
	const [showReg, setShowReg] = useState(false);
	const [regUsername, setRegUsername] = useState("");
	const [regPassword, setRegPassword] = useState("");

	const register = () => {
		axios({
			method: "POST",
			data: {
				username: regUsername,
				password: regPassword
			},
			withCredentials: true,
			url: "http://localhost:3001/register"
		}).then((res) => console.log(res));
	};

	return (
		<>
			<div>
				<button onClick={() => setShowReg(true)}>Registration</button>
			</div>

			{showReg &&
				<div id="regDiv">
					<h2>Sign Up</h2>
					Username: <input type="text" id="regId" placeholder="username"
						onChange={e => setRegUsername(e.target.value)}
					/>
					Password: <input type="password" id="regPw" placeholder="password"
						onChange={e => setRegPassword(e.target.value)}
					/>
					<button onClick={register}>Register</button>
					<button onClick={() => setShowReg(false)}>Cancel</button>
				</div>}
		</>
	)
};