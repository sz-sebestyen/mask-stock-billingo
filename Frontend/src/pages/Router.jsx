import Login from "./Login";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import HospitalRegistration from "./HospitalRegistration";
import Hospital from "./Hospital";
import MaskOrder from "./MaskOrder";
import NotFound from "./NotFound";
import Home from "./Home";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/registration">
        <Registration />
      </Route>

      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      <Route exact path="/hospital-registration">
        <HospitalRegistration />
      </Route>

      <Route exact path="/hospital/:id">
        <Hospital />
      </Route>

      <Route exact path="/mask-order/:id">
        <MaskOrder />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
