import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { Suspense, useContext } from "react";
import Loading from "../components/loading";

export const ProtectedRoute = () => {
  const { isAutenticated } = useContext(AuthContext);
  console.log(isAutenticated);
  // Check if the user is authenticated
  if (!isAutenticated) {
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
