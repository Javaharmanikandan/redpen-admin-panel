import React from "react";
import { useAuth } from './auth-context/auth.context';
import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  let { user } = useAuth();
 const status= localStorage.getItem('adminLoginRed')

    return (<>
      {(!status  || status === "") ? (
     
       navigate("/authentication/sign-in")
      ) : (
        <Outlet />
      )} 
  </>);
};
