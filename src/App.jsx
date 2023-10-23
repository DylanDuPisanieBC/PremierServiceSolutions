import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Components/Home.jsx'
import SignIn from './Components/SignIn.jsx'
import Register from './Components/Register.jsx'
import Dashboard from './Components/Dashboard.jsx'
import AddClient from './Components/AddClient.jsx';
import AddJob from './Components/AddJobs.jsx';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/add_client" component={AddClient} />
        <Route path="/add_job" component={AddJob} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );

}

export default App
