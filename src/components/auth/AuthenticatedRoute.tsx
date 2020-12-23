import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from '../contexts/RootContext';

//Acts as a wrapper for the react router Route component.
export default ({ render, ...routeProps }: any) => {
  const { authenticated } = useContext(RootContext);

  //Checks if the user is authenticated and shows the correct page, otherwise redirects to the login page.
  return (
    <Route
      {...routeProps}
      render={() => (authenticated === 'true' ? 
        render() : 
        <Redirect to='/login' />)
      }
    />
  );
};