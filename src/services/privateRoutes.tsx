import { redirect, Route } from "react-router-dom";
const PrivateRoute = (props: any) => {
  const token = localStorage.getItem("auth");
  return <>{token ? <Route {...props} /> : redirect("/login")}</>;
};

export default PrivateRoute;
