import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '../routes/routes';

function App() {
    const router = createBrowserRouter(routes);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
