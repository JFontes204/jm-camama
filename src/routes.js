import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Switch } from 'react-router-dom';
import NavBarComponent from './components/NavBarComponent';
import Home from './components/Home';
import Charts from './components/Charts';
import Settings from './components/Settings';
import User from './components/User';
import UserViewer from './components/User/viewer';
import UserCreate from './components/User/create';
import UserUpdate from './components/User/update';
import Comite from './components/Comite';
import ComiteViewer from './components/Comite/viewer';
import ComiteCreate from './components/Comite/create';
import ComiteUpdate from './components/Comite/update';
import Nucleo from './components/Nucleo';
import NucleoViewer from './components/Nucleo/viewer';
import NucleoCreate from './components/Nucleo/create';
import NucleoUpdate from './components/Nucleo/update';
import Militante from './components/Militante';
import MilitanteViewer from './components/Militante/viewer';
import MilitanteCreate from './components/Militante/create';
import MilitanteUpdate from './components/Militante/update';
import Agenda from './components/Agenda';
import AgendaViewer from './components/Agenda/viewer';
import AgendaCreate from './components/Agenda/create';
import AgendaUpdate from './components/Agenda/update';
import './styles/app.css';

export default function Routes() {
  return (
    <BrowserRouter>
      <NavBarComponent />
      <div className="outer">
        <div className="container inner mt-2">
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/user" component={User} />
            <PrivateRoute path="/user-viewer/:user_id" component={UserViewer} />
            <PrivateRoute path="/user-create" component={UserCreate} />
            <PrivateRoute path="/user-update/:user_id" component={UserUpdate} />

            <PrivateRoute
              component={ComiteUpdate}
              path="/comite-update/:comite_id"
            />
            <PrivateRoute
              component={ComiteViewer}
              path="/comite-viewer/:comite_id"
            />
            <PrivateRoute path="/comite" component={Comite} />
            <PrivateRoute path="/comite-create" component={ComiteCreate} />

            <PrivateRoute
              component={NucleoUpdate}
              path="/nucleo-update/:nucleo_id"
            />
            <PrivateRoute
              component={NucleoViewer}
              path="/nucleo-viewer/:nucleo_id"
            />
            <PrivateRoute path="/nucleo" component={Nucleo} />
            <PrivateRoute path="/nucleo-create" component={NucleoCreate} />

            <PrivateRoute
              path="/militante-create"
              component={MilitanteCreate}
            />
            <PrivateRoute
              component={MilitanteUpdate}
              path="/militante-update/:militante_id"
            />
            <PrivateRoute
              component={MilitanteViewer}
              path="/militante-viewer/:militante_id"
            />
            <PrivateRoute path="/militante" component={Militante} />

            <PrivateRoute
              component={AgendaUpdate}
              path="/agenda-update/:agenda_id"
            />
            <PrivateRoute
              component={AgendaViewer}
              path="/agenda-viewer/:agenda_id"
            />
            <PrivateRoute path="/agenda" component={Agenda} />
            <PrivateRoute path="/agenda-create" component={AgendaCreate} />

            <PrivateRoute path="/charts" component={Charts} />
            <PrivateRoute path="/profile" component={Settings} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute
              component={ComiteViewer}
              path="/comite-actual/:comite_id"
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}
