import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Note the correct capitalization here
import 'react-toastify/dist/ReactToastify.css'; // Note the correct capitalization here
import {AuthContextProvider} from "./context/AuthContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </BrowserRouter>

);
