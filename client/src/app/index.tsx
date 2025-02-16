import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { store } from './store'
import { Provider as ChakraProvider } from '@chakra-ui/react/provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ChakraProvider>
      </ReduxProvider>
    </React.StrictMode>
  </>,
)
