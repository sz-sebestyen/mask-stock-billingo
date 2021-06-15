import { useState, useEffect } from "react";
// import RegModal from "./RegModal";
import axios from "axios";

export default function Register() {
	const [showReg, setShowReg] = useState(false);
	const [regUsername, setRegUsername] = useState("");
	const [regPassword, setRegPassword] = useState("");

	const register = () => {
		axios({
			method: "post",
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
				<div>
					Username: <input type="text" id="" placeholder="username"
						onChange={e => setRegUsername(e.target.value)}
					/>
					Password: <input type="password" id="" placeholder="password"
						onChange={e => setRegPassword(e.target.value)}
					/>
					<button onClick={register}>Sign Up</button>
					<button onClick={() => setShowReg(false)}>Cancel</button>
				</div>}
		</>
	)
};