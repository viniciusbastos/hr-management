import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Suspense, useContext } from "react";
import Loading from "../components/loading";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
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
