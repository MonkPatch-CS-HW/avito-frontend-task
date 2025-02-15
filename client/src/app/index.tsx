import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ReduxProvider>
    </React.StrictMode>
  </>,
)
