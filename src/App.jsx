import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Components/Home.jsx'
import SignIn from './Components/SignIn.jsx'
import Register from './Components/Register.jsx'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign_in" component={SignIn} />
        <Route path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );

}

export default App
