import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../user-management/logout-button";
import { User } from "auth0";
import { Flex, Spacer } from "@chakra-ui/react";
import UserInfo from "../user-management/UserInfo";

function Header() {

    return (<Flex align='center' p='2'>
        <UserInfo />
        <Spacer />
        <LogoutButton />
    </Flex>)
}

export default Header;