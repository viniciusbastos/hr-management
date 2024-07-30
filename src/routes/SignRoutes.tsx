import type React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../views/signin";

const SignRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default SignRoutes;
