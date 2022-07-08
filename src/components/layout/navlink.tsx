import { Link } from '@chakra-ui/react';
import React from 'react';
import { NavLink as ReactNavLink } from 'react-router-dom';
import theme from '../../theme';

type NavLinkProps = {
  to: string;
  children: any;
};

function NavLink({ to, children }: NavLinkProps) {
  const activeStyle = {
    background: theme.primaryHex,
    color: theme.textOnPrimary,
  };

  return (
    <Link
      as={ReactNavLink}
      to={to}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      p={3}
      borderRadius={theme.borderRadius}
      fontWeight="bold"
      display="block"
    >
      {children}
    </Link>
  );
}

export default NavLink;
