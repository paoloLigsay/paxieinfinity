import Login from './components/smartComponents/Login'
import Dashboard from './components/smartComponents/Dashboard'
import Transactions from './components/smartComponents/Transactions'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom"

const App = () => {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
           <Dashboard />
          </Route>
          <Route exact path="/transactions">
           <Transactions />
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
