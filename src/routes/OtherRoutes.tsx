import type React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/dashboard";
import { Details, Home } from "@mui/icons-material";
import Courses from "../views/courses";
import CourseName from "../views/courses/courseName";
import CourseDetails from "../views/courses/details";
import FormUser from "../views/formUser";
import Teste from "../views/teste";
import Vacation from "../views/vacation";
import VacationDetails from "../views/vacation/details";
import VacationMonth from "../views/vacation/month";
import SideBar from "../components/sidebar";
import Forbidden from "../views/Forbidden";
import EditProfileView from "../views/user/EditProfileView";

const OtherRoutes: React.FC = () => {
  return (
    <>
      <div className="flex flex-row">
        <SideBar />
        <main className="w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/details/:id" element={<Details />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/formUser" element={<FormUser />}></Route>
            <Route path="/vacation/:id" element={<VacationDetails />}></Route>
            <Route path="/vacation" element={<Vacation />}></Route>
            <Route
              path="/vacation/month/:month"
              element={<VacationMonth />}
            ></Route>
            <Route path="/courses" element={<Courses />}></Route>
            <Route path="/test" element={<Teste />}></Route>

            <Route path="/courses/:name" element={<CourseName />}></Route>
            <Route
              path="/courses/details/:id"
              element={<CourseDetails />}
            ></Route>
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/users/edit/:id" element={<EditProfileView />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default OtherRoutes;
