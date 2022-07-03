import { Center, Container, Spinner } from "@chakra-ui/react";
import React from "react";
import theme from "../../theme";

function Loading (){
    return (
        <Container maxW='100vw' h='100vh'>
            <Center w="100%" h="100%">
                <Spinner size='xl' color={theme.primary}/>
            </Center>
        </Container>
    )
}

export default Loading;