import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

const GuestRoute = ({ element, ...props }) => {
  const { token } = useContext(authContext);
  const Component = token ? () => <Navigate to="/" /> : element;

  return <Route {...props} element={<Component />} />;
};

export default GuestRoute;