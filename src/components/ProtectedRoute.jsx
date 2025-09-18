// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, user, allowedRoles, children }) {
  // Wait until user state is loaded from localStorage
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // block wrong role
  }

  return children;
}

export default ProtectedRoute;
