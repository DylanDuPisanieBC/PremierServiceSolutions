import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home.jsx';
import SignIn from './Components/SignIn.jsx';
import Register from './Components/Register.jsx';
import Dashboard from './Components/Dashboard.jsx';
import AddClient from './Components/AddClient.jsx';
import AddJob from './Components/AddJobs.jsx';
import ViewClientDetails from './Components/ViewClientDetails.jsx';
import ViewEmployees from './Components/ViewEmployees.jsx';
import ViewJobs from './Components/ViewJobs.jsx';
import ViewCalls from './Components/ViewCalls.jsx';
import ViewContracts from './Components/ViewContracts.jsx';
import AddJobs from './Components/AddJobs.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add_client" component={AddClient} />
        <Route path="/add_jobs" component={AddJobs} />
        <Route path="/view_client_details" component={ViewClientDetails} />
        <Route path="/View_Employees" component={ViewEmployees} /> 
        <Route path="/View_Jobs" component={ViewJobs} /> 
        <Route path="/View_Calls" component={ViewCalls} /> 
        <Route path="/View_Contracts" component={ViewContracts} /> 
        <Redirect to="/" />
      </Switch>
    </Router>
  );
  
}

export default App;
