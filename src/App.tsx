import { useState } from 'react';
import {
  Container,
  Heading,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Home from './views/home';
import LoginButton from './components/user-management/login-button';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/header';
import Loading from './components/layout/Loading';
import Footer from './components/layout/footer';

function App() {
  return (
    <Container maxW="100vw">
      <Header />
      <Container maxW="1200px">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
      <Footer />
    </Container>
  );
}

export default withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});
