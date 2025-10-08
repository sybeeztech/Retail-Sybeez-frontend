import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, fallbackPath = '/' }) => {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.employee?.role)) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

export default ProtectedRoute;