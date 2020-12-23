
import { Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UnprotectedTest from './components/pages/UnprotectedTest';
import ProtectedTest from './components/pages/ProtectedTest';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute'
import Navbar from './components/Navbar';

function App() {

  return (
    <Container>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/unprot" component={UnprotectedTest} />
          <Route path="/test" render={() => <div>test route</div>} />
          <AuthenticatedRoute path="/prot" render={ProtectedTest} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
