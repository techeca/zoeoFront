import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import router from './routes'
import './index.css'

const routes = createBrowserRouter(router);
//const routes = createHashRouter(router);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <RouterProvider router={routes} />
    
  </React.StrictMode>,
)
