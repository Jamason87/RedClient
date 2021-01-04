
import { Container } from '@material-ui/core';
import React, { Component } from 'react';
import './App.css';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute'
import Navbar from './components/Navbar';
import Wishlist from './components/pages/collections/Wishlist';
import CollectionList from './components/pages/collections/CollectionsList';
import Collection from './components/pages/collections/Collection';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/test" render={() => <div>test route</div>} />
            <AuthenticatedRoute path="/wishlist" component={Wishlist} />
            <AuthenticatedRoute path="/collections" component={CollectionList} />
            <AuthenticatedRoute path="/collection/:collectionId" component={Collection} />
          </Switch>
        </Router>
      </Container>
    )
  }
}