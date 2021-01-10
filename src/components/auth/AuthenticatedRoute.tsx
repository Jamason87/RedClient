import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from '../contexts/RootContext';

type AuthenticatedRouteProps = {
  component: any
  path: string
}

type AuthenticatedRouteState = {

}

export default class AuthenticatedRoute extends Component<AuthenticatedRouteProps,AuthenticatedRouteState> {

  static contextType = RootContext;

  render() {
      return (
        this.context.authenticated === 'true' ? <Route
              {...this.props} /> : <Redirect to='/login' />
      )
  }
}
