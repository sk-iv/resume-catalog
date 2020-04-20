import * as React from 'react';
// import { renderRoutes } from "react-router-config"
import {
  Switch,
  Route,
} from 'react-router-dom';
import routes from './pages';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export const Routes = () => (
  <Switch>
    {routes.map((route) => (
      <RouteWithSubRoutes key={Math.random().toString(36).substr(2, 9)} {...route} />
    ))}
  </Switch>
);
