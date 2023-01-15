import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './app.css'

const root = document.getElementById('root') as HTMLElement

ReactDom.createRoot(root).render(
  <>
    <ToastContainer />
    <App />
  </>
)
