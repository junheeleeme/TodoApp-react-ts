import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './app.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = document.getElementById('root') as HTMLElement

ReactDom.createRoot(root).render(
  <>
    <ToastContainer />
    <App />
  </>
)
