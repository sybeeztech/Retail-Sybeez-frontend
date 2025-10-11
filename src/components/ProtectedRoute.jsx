import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = null, fallbackPath = '/login' }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // If specific roles are required, check them
  if (allowedRoles && !allowedRoles.includes(user.employee?.role)) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

export default ProtectedRoute;