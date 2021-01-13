
import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute'
import Navbar from './components/Navbar';
import Wishlist from './components/pages/collections/Wishlist';
import Collection from './components/pages/collections/Collection';
import Collections from './components/pages/collections/Collections';
import Home from './components/pages/Home';
import Search from './components/pages/search/Search';
import Funko from './components/pages/funko/Funko';
import Footer from './components/Footer';
import Admin from './components/admin/Admin';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Navbar />
          <div style={{padding: "10px", paddingTop: "30px"}}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/test" render={() => <div>test route</div>} />
              <Route path="/funko/:funkoId" component={Funko} />
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={Search} />
              <AuthenticatedRoute path="/wishlist" component={Wishlist} />
              <AuthenticatedRoute path="/collections" component={Collections} />
              <AuthenticatedRoute path="/collection/:collectionId" component={Collection} />
              <AuthenticatedRoute path="/admin" component={Admin} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Container>
    )
  }
}