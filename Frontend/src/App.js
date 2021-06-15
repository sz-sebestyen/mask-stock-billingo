import { useState, useEffect } from "react";
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

//npm i axios
// TODO: reg. és login látszik
// TODO: login után -> logout látszik
// TODO: logoutra??

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [regUsername, setRegUsername] = useState("");
  // const [regPassword, setRegPassword] = useState("");
  // const [loginUsername, setLoginUsername] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  return (
    <div className="App">
      {loggedIn ?
        <Logout />
        :
        <>
          <Register />
          <Login />
        </>
      }

    </div>
  );
}

export default App;
