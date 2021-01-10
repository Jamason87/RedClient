// RootContext.js
import React, { Component } from 'react';

type ContextTypes = {
    authenticated: string,
    setAuthenticated: any,
    authBody: string,
    setAuthBody: any,
    token: string,
    setToken: any,
    serverUrl: string
}

export const RootContext = React.createContext<Partial<ContextTypes>>({});

type RootContextProps = {}

type RootContextState = {
  authenticated: string,
  authBody: string,
  token: string
  serverUrl: string
}

export default class RootContextClass extends Component<RootContextProps, RootContextState> {

  constructor(props: any) {
    super(props);

    this.state = {
      authenticated: '',
      authBody: '',
      token: '',
      serverUrl: 'http://localhost:4002'
    }

    this.defaultContext = this.defaultContext.bind(this);
  }

  componentDidMount() {
    this.setState({
      authenticated: localStorage.getItem('authenticated') || '',
      authBody: localStorage.getItem('authBody') || '',
      token: localStorage.getItem('token') || '',
      serverUrl: 'http://localhost:4002'
    })

    switch(window.location.hostname) {
      case 'localhost' || '127.0.0.1':
        this.setState({
          serverUrl: 'http://localhost:4002'
        })
        break;
      case 'jam-funkofolder-client.herokuapp.com':
        this.setState({
          serverUrl: 'https://jam-funkofolder-server.herokuapp.com'
        })
    }
  }

  componentDidUpdate() {
          localStorage.setItem('authenticated', this.state.authenticated);
          localStorage.setItem('authBody', this.state.authBody);
          localStorage.setItem('token', this.state.token)
  }

  defaultContext() {
    return {
      authenticated: this.state.authenticated,
      setAuthenticated: (v: string) => this.setState({authenticated: v}),
      authBody: this.state.authBody,
      setAuthBody: (v: string) => this.setState({authBody: v}, () => console.log('called')),
      token: this.state.token,
      setToken: (v: string) => this.setState({token: v}),
      serverUrl: this.state.serverUrl
    };
  }

  render() {
    return (
      <RootContext.Provider value={this.defaultContext()}>
        {this.props.children}
      </RootContext.Provider>
    )
  }
}
