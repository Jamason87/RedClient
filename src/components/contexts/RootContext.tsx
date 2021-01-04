// RootContext.js
import React, { Component, useEffect, useState } from 'react';

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

//RootContext surronds the whole application so we can call useContext(RootContext) in any component to get global variables (auth, authbody)
// export const testst = ({ children }: any) => {
//   const prevAuth = localStorage.getItem('authenticated') || '';
//   const prevAuthBody = localStorage.getItem('authBody') || '';
//   const prevToken = localStorage.getItem('token') || '';
//   const serverUrl = 'http://localhost:4002';

//   const [authenticated, setAuthenticated] = useState(prevAuth);
//   const [authBody, setAuthBody] = useState(prevAuthBody);
//   const [token, setToken] = useState(prevToken);

//   useEffect(
//     () => {
//       localStorage.setItem('authenticated', authenticated);
//       localStorage.setItem('authBody', authBody);
//       localStorage.setItem('token', token)
//     },
//     [authenticated, authBody, token]
//   );

//   const defaultContext = {
//     authenticated,
//     setAuthenticated,
//     authBody,
//     setAuthBody,
//     token,
//     setToken,
//     serverUrl
//   };

//   return (
//     <RootContext.Provider value={defaultContext}>
//       {children}
//     </RootContext.Provider>
//   );
// };

type RootContextProps = {

}

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
    //   const prevAuth = localStorage.getItem('authenticated') || '';
//   const prevAuthBody = localStorage.getItem('authBody') || '';
//   const prevToken = localStorage.getItem('token') || '';
    this.setState({
      authenticated: localStorage.getItem('authenticated') || '',
      authBody: localStorage.getItem('authBody') || '',
      token: localStorage.getItem('token') || '',
      serverUrl: 'http://localhost:4002'
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
