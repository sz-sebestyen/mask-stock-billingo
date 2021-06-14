import Login from "./Login";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import HospitalRegistration from "./HospitalRegistration";
import Hospital from "./Hospital";
import MaskOrder from "./MaskOrder";
import NotFound from "./NotFound";
import Home from "./Home";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserStateProtection from "../components/UserStateProtection";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login">
        <UserStateProtection reversed>
          <Login />
        </UserStateProtection>
      </Route>

      <Route exact path="/registration">
        <UserStateProtection reversed>
          <Registration />
        </UserStateProtection>
      </Route>

      <Route exact path="/dashboard">
        <UserStateProtection>
          <Dashboard />
        </UserStateProtection>
      </Route>

      <Route exact path="/hospital-registration">
        <UserStateProtection>
          <HospitalRegistration />
        </UserStateProtection>
      </Route>

      <Route exact path="/hospital/:id">
        <UserStateProtection>
          <Hospital />
        </UserStateProtection>
      </Route>

      <Route exact path="/mask-order/:id">
        <UserStateProtection>
          <MaskOrder />
        </UserStateProtection>
      </Route>

      <Route exact path="/">
        <UserStateProtection reversed>
          <Home />
        </UserStateProtection>
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
