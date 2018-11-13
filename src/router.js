import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import HOME from './routes/home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HOME} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
