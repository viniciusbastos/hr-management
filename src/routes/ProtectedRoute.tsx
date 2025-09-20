import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Suspense, useContext } from "react";
import Loading from "../components/loading";
import { useRoleBasedAccess } from "../contexts/rbac/RoleBasedAccessContext";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { userRole } = useRoleBasedAccess();
  
  // Check if the user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/signin" />;
  }

  // If authenticated, render the child routes
  return (
    <>
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
    </>

  ) 
};
