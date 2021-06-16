export default function RegModal({ shown, close }) {
	return shown && (
		<div>
			Username: <input type="text" id="" placeholder="username" />
			Password: <input type="password" id="" placeholder="password" />
			<button onClick={close}>Sign Up</button>
			<button onClick={close}>Cancel</button>
		</div>
	)
};