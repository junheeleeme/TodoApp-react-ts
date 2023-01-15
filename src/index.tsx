import ReactDom from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './app.css'

const root = document.getElementById('root') as HTMLElement

ReactDom.createRoot(root).render(
  <>
    <ToastContainer />
    <App />
  </>
)
