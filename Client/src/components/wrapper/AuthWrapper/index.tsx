import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../store/Context/authContext';
import { ChildrenProp } from '../../../store/store';

const AuthWrapper = ({ children }: ChildrenProp) => {
  const router = useNavigate();
  const AuthContextData = React.useContext(AuthContext);

  React.useEffect(() => {
    if (window && !localStorage.getItem('token'))
      AuthContextData.dispatch({ type: 'INVALID' });
  }, []);

  // React.useEffect(() => {
  //   if (AuthContextData?.state?.currentState === 'unauthorized')
  //     router('/login');
  // });

  return <>{ children}</>;
};

export default AuthWrapper