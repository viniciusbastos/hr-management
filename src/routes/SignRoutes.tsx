import type React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../views/signin";

const SignRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />}></Route>
      </Routes>
    </>
  );
};

export default SignRoutes;
