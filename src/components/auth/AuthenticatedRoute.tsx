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

  constructor(props: any) {
    super(props)
  }

  // render() {
  //   return (
  //     <Route
  //       {...this.props}
  //       component={() => (this.context.authenticated === 'true' ? 
  //         this.props.component() : 
  //         <Redirect to='/login' />)
  //       }
  //     />
  //   )
  // }

  render() {
      return (
        this.context.authenticated ? <Route
              {...this.props} /> : <Redirect to='/login' />
      )
  }
}
