import "./App.css";
import Router from "./pages/Router";
import UserContextProvider from "./components/UserContextProvider";

//npm i axios
// TODO: reg. és login látszik
// TODO: login után -> logout látszik
// TODO: logoutra??

function App() {
  //
  // const [regUsername, setRegUsername] = useState("");
  // const [regPassword, setRegPassword] = useState("");
  // const [loginUsername, setLoginUsername] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
