import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/global.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/goout" component={Logout} />
        <Routes />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
