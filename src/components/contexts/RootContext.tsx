// RootContext.js
import React, { useEffect, useState } from 'react';

type ContextTypes = {
    authenticated: string,
    setAuthenticated: any,
    authBody: string,
    setAuthBody: any,
    token: string,
    setToken: any
}

export const RootContext = React.createContext<Partial<ContextTypes>>({});

//RootContext surronds the whole application so we can call useContext(RootContext) in any component to get global variables (auth, authbody)
export default ({ children }: any) => {
  const prevAuth = localStorage.getItem('authenticated') || '';
  const prevAuthBody = localStorage.getItem('authBody') || '';
  const prevToken = localStorage.getItem('token') || '';

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [authBody, setAuthBody] = useState(prevAuthBody);
  const [token, setToken] = useState(prevToken);

  useEffect(
    () => {
      localStorage.setItem('authenticated', authenticated);
      localStorage.setItem('authBody', authBody);
      localStorage.setItem('token', token)
    },
    [authenticated, authBody, token]
  );

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody,
    token,
    setToken
  };

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};