// RootContext.js
import Axios from 'axios';
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
  isAdmin: boolean
}

export default class RootContextClass extends Component<RootContextProps, RootContextState> {

  constructor(props: any) {
    super(props);

    this.state = {
      authenticated: '',
      authBody: '',
      token: '',
      isAdmin: false,
      serverUrl: (window.location.hostname === ('localhost' || '127.0.0.1')) ? 'http://localhost:4002' : 'https://jam-funkofolder-server.herokuapp.com'
    }

    this.defaultContext = this.defaultContext.bind(this);
  }

  componentDidMount() {
    Axios.get(`${this.state.serverUrl}/user/auth`, {
      headers: {
        "Authorization": localStorage.getItem('token') || ''
      }
    })
      .then(res => {
        this.setState({
          authenticated: (res.status === 200) ? localStorage.getItem('authenticated') || '' : '',
          authBody: (res.status === 200) ? localStorage.getItem('authBody') || '' : '',
          token: (res.status === 200) ? localStorage.getItem('token') || '' : '',
          isAdmin: res.data.isAdmin
        })
      })
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
      serverUrl: this.state.serverUrl,
      isAdmin: this.state.isAdmin
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
