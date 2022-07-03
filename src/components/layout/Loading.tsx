import { Center, Container, Spinner } from "@chakra-ui/react";
import React from "react";

function Loading (){
    return (
        <Container maxW='100vw' h='100vh'>
            <Center>
                <Spinner size='xl' />
            </Center>
        </Container>
    )
}

export default Loading;