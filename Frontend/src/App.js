import Router from "./pages/Router";
import UserContextProvider from "./components/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  );
}

export default App;
