import { useState } from 'react'
import { Container, Spinner, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Home from './components/views/home';
import LoginButton from './components/user-management/login-button';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/header';
import Loading from './components/layout/Loading';


function App() {
  return (
    <Container maxW='100vw' h='100vh'>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Container>);
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
})
