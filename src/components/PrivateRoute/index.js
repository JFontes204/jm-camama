import { Route } from 'react-router-dom';
import isAuthenticated from '../../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { success, error } = isAuthenticated();
        if (success) {
          return <Component {...props} />;
        } else {
          console.log('error:', error);
          window.location.href = '/';
          /* return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            ); */
        }
      }}
    />
  );
};
export default PrivateRoute;
