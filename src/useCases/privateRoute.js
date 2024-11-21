import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const xt = sessionStorage.getItem('x-t');
  const uuid = sessionStorage.getItem('uuid');

  if(
    xt !== null &&
    xt !== '' &&
    xt !== ' ' &&
    uuid !== null &&
    uuid !== '' &&
    uuid !== ' '
  )
  {
    return children

  } else {
    return <Navigate to="/" />

  }
};

export default PrivateRoute;
