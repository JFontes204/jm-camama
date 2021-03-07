import { Route } from 'react-router-dom';
import isAuthenticated from '../../auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const { success, error, user_id } = isAuthenticated();
        if (success) {
          return <Component {...props} user_id={user_id} />;
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
