import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
          <ChakraProvider>
            <App />
          </ChakraProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
)
