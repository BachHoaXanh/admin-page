import React, { Component } from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import './scss/style.scss';
import {PrivateRoute, PublicRoute} from "./common";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* Public Route */}
            <PublicRoute exact path="/login" name="Login" component={Login}/>
            <PublicRoute exact path="/404" name="Page 404" component={Page404}/>
            <PublicRoute exact path="/500" name="Page 500" component={Page500}/>

            {/* Private Route */}
            <PrivateRoute path="/" name="Home" component={TheLayout}/>
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
