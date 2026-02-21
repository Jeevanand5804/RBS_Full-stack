import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EmailProvider } from '../src/base/EmailContext';


ReactDOM.createRoot(document.getElementById('root')).render(
   <EmailProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </EmailProvider>,
)
