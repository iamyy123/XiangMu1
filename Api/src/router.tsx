import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import BookCatalog from './pages/BookCatalog';
import BorrowRecords from './pages/BorrowReaders';
import Login from './pages/Login';
import { AuthGuard } from './components/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/Login',
        element: <AuthGuard><Login /></AuthGuard>,
      },
      {
        path: '/catalog',
        element: <AuthGuard><BookCatalog /></AuthGuard>,
      },
      {
        path: '/records',
        element: <AuthGuard><BorrowRecords /></AuthGuard>,
      },
    
    ],
  },
]);