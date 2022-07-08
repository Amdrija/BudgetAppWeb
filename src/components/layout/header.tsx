import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../user-management/logout-button';
import { User } from 'auth0';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import UserInfo from '../user-management/UserInfo';
import MenuDrawer from './menu-drawer';

function Header() {
  return (
    <Box>
      <Flex align="center" p="2">
        <MenuDrawer />
        <Spacer />
        <LogoutButton />
      </Flex>
    </Box>
  );
}

export default Header;
