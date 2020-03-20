import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { privateRoutes } from '../Routes/privateRoutes';

const AntContent = Layout.Content;

const Content = props => {
  return (
    <AntContent className='min-height-100vh p-15'>
      <Switch>
        { privateRoutes.map(e => {
          const { Component } = e;
          return <Route exact key={e.key} path={e.path} render={() => <Component {...props} />} />;
        })}
        <Redirect to={{ pathname: '/' }} />
      </Switch>
    </AntContent>
  );
};

export { Content };
