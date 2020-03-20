import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../Routes/routes';
import { PrivateRoutes } from './PrivateRoutes';
import { Layout } from '../Layout';

const App = (props) => {
  const isLoggedIn = localStorage.getItem('userEmail');

  return (
    <Switch>
      {routes.map(r => {
        const { path, Component } = r;
        return (
          <Route
            key={path}
            path={path}
            render={p => isLoggedIn ?
              <Redirect to={{ pathname: '/' }} /> :
              <Component {...p} />
            }
          />
        );
      })}
      <PrivateRoutes {...props} path='/' component={Layout} />
    </Switch>
  );
}

export { App };
