import { useAuth0, User } from "@auth0/auth0-react";
import { Avatar, VStack, Text, HStack, Stack, Flex } from "@chakra-ui/react";
import React from "react";

function UserInfo() {
    const { user }= useAuth0();
    const { name, picture, email } = user as User;

    return (
        <HStack>
            <Avatar name={name} src={picture}></Avatar>
            <Flex direction='column' justify='space-around' align='flex-start'>
                <Text>{name}</Text>
                <Text>{email}</Text>
            </Flex>
        </HStack>
    )
}

export default UserInfo;