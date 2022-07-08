import {
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Image,
  Box,
  DrawerFooter,
  Link,
  List,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import UserInfo from '../user-management/UserInfo';
import menuIcon from '../../res/svg/menu.svg';
import LogoutButton from '../user-management/logout-button';
import { Link as RouterLink } from 'react-router-dom';
import theme from '../../theme';
import NavLink from './navlink';

function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bg="white" onClick={onOpen} p={0}>
        <Image src={menuIcon} alt="menu" w="32px" height="32px" />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <UserInfo />
          </DrawerHeader>
          <DrawerBody mt={3}>
            <nav>
              <List spacing={3}>
                <ListItem>
                  <NavLink to="">Насловна</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="categories">Категорије</NavLink>
                </ListItem>
                <ListItem>
                  <NavLink to="search">Претрага</NavLink>
                </ListItem>
              </List>
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
