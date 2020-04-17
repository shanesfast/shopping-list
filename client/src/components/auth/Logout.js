import React from 'react';
import { NavLink } from 'reactstrap';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </>
  );
}

export default Logout;