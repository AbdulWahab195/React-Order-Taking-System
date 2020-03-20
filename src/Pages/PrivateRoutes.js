import React from "react";
import { Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={() => <Component {...rest} />} />;
};

export { PrivateRoutes };
