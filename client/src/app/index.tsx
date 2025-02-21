import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router'
import { store } from './store'
import './i18n.ts'
import { Layout } from '@/widgets/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </ReduxProvider>
    </React.StrictMode>
  </>,
)
