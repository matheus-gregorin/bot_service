import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const isAuthenticated = sessionStorage.getItem('x-t');

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
