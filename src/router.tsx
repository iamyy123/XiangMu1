import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './Home/page';
import BookCatalog from './BookCatalog/page';
import BorrowRecords from './BorrowRecords/page';
import Login from './Login/page';
import ReaderManagement from './ReaderManagement/page';
import { AuthGuard } from './components/AuthGuard';
import BookReturn from './BookReturn/page';

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
      {
        path: '/readers',
        element: <AuthGuard><ReaderManagement /></AuthGuard>,
      },
      {
        path: '/return',
        element: <AuthGuard><BookReturn /></AuthGuard>,
      },

    ],
  },
]);