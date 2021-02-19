import React from 'react';
import NavBarComponent from './components/NavBarComponent';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import UserCreate from './components/User/create';
import Comite from './components/Comite';
import ComiteUpdate from './components/Comite/update';
import ComiteCreate from './components/Comite/create';
import Nucleo from './components/Nucleo';
import NucleoCreate from './components/Nucleo/create';
import Militante from './components/Militante';
import MilitanteCreate from './components/Militante/create';
import Agenda from './components/Agenda';
import AgendaCreate from './components/Agenda/create';
import Charts from './components/Charts';
import './styles/app.css';

const Routes = () => (
  <BrowserRouter>
    <NavBarComponent />
    <div className="outer">
      <div className="container inner mt-2">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/user" component={User} />
          <PrivateRoute path="/user-create" component={UserCreate} />
          <PrivateRoute path="/comite" component={Comite} />
          <PrivateRoute
            path="/comite-update/:comite_id"
            component={ComiteUpdate}
          />
          <PrivateRoute path="/comite-create" component={ComiteCreate} />
          <PrivateRoute path="/nucleo" component={Nucleo} />
          <PrivateRoute path="/nucleo-create" component={NucleoCreate} />
          <PrivateRoute path="/militante" component={Militante} />
          <PrivateRoute path="/militante-create" component={MilitanteCreate} />
          <PrivateRoute path="/agenda" component={Agenda} />
          <PrivateRoute path="/agenda-create" component={AgendaCreate} />
          <PrivateRoute path="/charts" component={Charts} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Routes;
