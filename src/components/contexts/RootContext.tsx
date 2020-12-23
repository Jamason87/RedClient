// RootContext.js
import React, { useEffect, useState } from 'react';

type ContextTypes = {
    authenticated: string,
    setAuthenticated: any,
    authBody: string,
    setAuthBody: any
}

export const RootContext = React.createContext<Partial<ContextTypes>>({});

//RootContext surronds the whole application so we can call useContext(RootContext) in any component to get global variables (auth, authbody)
export default ({ children }: any) => {
  const prevAuth = localStorage.getItem('authenticated') || '';
  const prevAuthBody = localStorage.getItem('authBody') || '';

  const [authenticated, setAuthenticated] = useState(prevAuth);
  const [authBody, setAuthBody] = useState(prevAuthBody);

  useEffect(
    () => {
      localStorage.setItem('authenticated', authenticated);
      localStorage.setItem('authBody', authBody);
    },
    [authenticated, authBody]
  );

  const defaultContext = {
    authenticated,
    setAuthenticated,
    authBody,
    setAuthBody
  };

  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};