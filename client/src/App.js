import "./App.css";
import Footer from "./Components/Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Screens/Landing/Landing";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import CivilDashboard from "./Screens/CivilDashboard/CivilDashboard";
import CreateProfile from "./Components/CreateProfile/CreateProfile";
import CivilConnecters from "./Components/CivilConnecters/CivilConnecters";
import ProfileCard from "./Components/ProfileCard/ProfileCard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import NotFound from "./Components/NotFound/NotFound";
import AboutUs from "./Components/AboutUs/AboutUs";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Dashboard} />
      <section className="container">
        <Switch>
          <Route path="/signUp" component={SignUp} />
          <Route path="/signIn" component={SignIn} />
          <PrivateRoute path="/CivilDashboard" component={CivilDashboard} />
          <PrivateRoute path="/CreateProfile" component={CreateProfile} />
          <PrivateRoute path="/CivilConnecters" component={CivilConnecters} />
          <Route path="/AboutUs" component={AboutUs} />
          {/* <Route component={NotFound} /> */}
        </Switch>
        {/* <ProfileCard /> */}
      </section>
      <Footer />
    </div>
  );
}

export default App;
