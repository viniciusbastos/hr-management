import "./main.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import Details from "./views/details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./views/dashboard";
import FormUser from "./views/formUser";
import SignIn from "./views/signin";
import Vacation from "./views/vacation";
import VacationDetails from "./views/vacation/details";
import VacationMonth from "./views/vacation/month";
import Courses from "./views/courses";
import CourseName from "./views/courses/courseName";
import CourseDetails from "./views/courses/details";
import Teste from "./views/teste";
import { AuthContext, AuthProvider } from "./contexts/authContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Login } from "@mui/icons-material";
import { useContext } from "react";
import SidebarLayout from "./routes/sideBarLayout";
import Sicknote from "./views/sicknote";
import SicknoteDetails from "./views/sicknote/details";
import VacationCheck from "./views/vacationcheck";
import { MembersTable } from "./components/tablematerial";
import NotFound from "./views/Notfound";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<SidebarLayout />}>
                  <Route path="users/" element={<MembersTable />}></Route>
                  <Route path="users/details/:id" element={<Details />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/vacation/submit" element={<Teste />}></Route>

                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/formUser" element={<FormUser />}></Route>
                  <Route
                    path="/vacation/:id"
                    element={<VacationDetails />}
                  ></Route>
                  <Route path="/vacation" element={<Vacation />}></Route>
                  
                  <Route
                    path="/vacation/month/:month"
                    element={<VacationMonth />}
                  ></Route>
                  <Route path="/courses" element={<Courses />}></Route>
                  
                  <Route path="/vacation/vacationcheck" element={<VacationCheck />}></Route>

                  <Route path="/courses/:name" element={<CourseName />}></Route>
                  <Route
                    path="/courses/details/:id"
                    element={<CourseDetails />}
                  ></Route>
                  <Route
                    path="/sicknote/:id"
                    element={<SicknoteDetails />}
                  ></Route>
                  <Route path="/sicknote" element={<Sicknote />}></Route>
                  <Route path='*' element={<NotFound />}/>

                </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
