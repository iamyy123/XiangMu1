import { Navigate } from 'react-router-dom';
import { useLibraryStore } from '../store/store';

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const user = useLibraryStore((state) => state.user);
  const storedUser = localStorage.getItem('user');

  if (!user && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};