import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import LoginPage from './LoginPage';
import { useEffect, useState } from 'react';

function RedirectToLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!shouldRedirect) {
      setShouldRedirect(true);
      navigate('/', { state: { from: location } });
    }
  }, [shouldRedirect, navigate, location]);

  return <LoginPage />;
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <RedirectToLogin />;
  }

  return children;
}

export default PrivateRoute;
