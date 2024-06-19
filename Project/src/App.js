import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./Home";
import { Navigation } from "./Navigation";
import ContactForm from "./ContactForm";
import { Movie } from "./Movie";
import { Ticket } from "./Ticket";
import { Employee } from "./Employee";
import { Department } from "./Department";
import { Events } from "./Events";
import PrivateRoute from "./Utils/PrivateRoute";
import ProtectedRoute from "./Utils/ProtectedRoute";
import PublicRoute from "./Utils/PublicRoute";
import Login from "./pages/login/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// import Register from './pages/register/Register';
import Register from "./Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MovieCategories } from "./MovieCategories";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div className=" justify-content-center">
          <Navigation />
        </div>

        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <div className="container">
              <Route path="/ContactForm" component={ContactForm} />
              <Route path="/Movie" component={Movie} />
              <Route path="/MovieCategories" component={MovieCategories} />
              <Route path="/Ticket" component={Ticket} />
              <Route path="/events" component={Events} />
              <Route path="/department" component={Department} />
              <Route path="/employee" component={Employee} />
              <Route path="/Register" component={Register} />
              <Route path="/Dashboard" component={Dashboard} />
              <Route path="/Navbar" component={Navbar} />
              <Route path="/Sidebar" component={Sidebar} />
            </div>
            {/* <PublicRoute exact path="/login" name="Login Page" component={Login} />
                  <PublicRoute exact path="/register" name="Register Page" component={Register} />  */}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

