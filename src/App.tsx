import { Suspense, useContext, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./views/home";
import Details from "./views/details";
import Dashboard from "./views/dashboard";
import FormUser from "./views/formUser";
import SignIn from "./views/signin";
//import Vacation from "./views/vacation";
import VacationDetails from "./views/vacation/details";
import VacationMonth from "./views/vacation/month";
//import Courses from "./views/courses";
import CourseName from "./views/courses/courseName";
import CourseDetails from "./views/courses/details";
import Teste from "./views/teste";
import { AuthContext, AuthProvider } from "./contexts/authContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AirOutlined, Login } from "@mui/icons-material";
import SidebarLayout from "./routes/sideBarLayout";
import Sicknote from "./views/sicknote";
import SicknoteDetails from "./views/sicknote/details";
import VacationCheck from "./views/vacationcheck";
//import { MembersTable } from "./components/tablematerial";
import NotFound from "./views/Notfound";
import DashboardTakeCareGuardian from "./views/takingcareofguardian/dashboardTakeCareGuardian";
import Appointment from "./views/takingcareofguardian/appointment";
import TakingCareGuardianList from "./views/takingcareofguardian/list";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/loading";
import AI from "./testeArtificialIteligence";
import ProcessTable from "./components/processTable";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
function App() {
  const Users = lazy(() => import("./components/tablematerial"));
  const Dashboard = lazy(() => import("./views/dashboard"));
  const Vacation = lazy(() => import("./views/vacation/index"));
  const Courses = lazy(() => import("./views/courses/index"));
  const [loading, setLoading] = useState<boolean>(true);
//  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  
  return loading ? (
    <Loading />
  ) : (
    <>
    <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/" element={<ProtectedRoute />}>
                  <Route path="/" element={<SidebarLayout />}>
                  <Route path="users/details/:id" element={<Details />}></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/vacation/submit" element={<Teste />}></Route>
                  <Route path="/ai" element={<AI />}></Route>
                  {/* <Route path="users/" element={<Users />}></Route> */}
                  <Route 
                  path="/users" 
                  element={
                    <Suspense 
                    fallback={ <Loading />

                    }>
                  <Users />
                </Suspense>
                  }>

                  </Route>
                  <Route 
                  path="/dashboard" 
                  element={
                    <Suspense 
                    fallback={ <Loading />

                    }>
                  <Dashboard />
                </Suspense>
                  }>
                    <Route 
                  path="/process" 
                  element={
                    <Suspense 
                    fallback={ <Loading />

                    }>
                  <ProcessTable />
                </Suspense>
                  }></Route>
                    

                  </Route>
                  <Route path="/formUser" element={<FormUser />}></Route> 
                  <Route
                    path="/vacation/:id"
                    element={<VacationDetails />}
                  ></Route>
                  <Route 
                  path="/vacation" 
                  element={
                    <Suspense 
                    fallback={ <Loading />

                    }>
                  <Vacation />
                </Suspense>
                  }>

                  </Route>
                  <Route
                    path="/vacation/month/:month"
                    element={<VacationMonth />}
                  ></Route>
                  <Route path="/courses" element={<Courses />}></Route>

                  <Route
                    path="/vacation/vacationcheck"
                    element={<VacationCheck />}
                  ></Route>

                  <Route path="/courses/:name" element={<CourseName />}></Route>
                  <Route
                    path="/courses/details/:id"
                    element={<CourseDetails />}
                  ></Route>
                  <Route
                    path="/sicknote/:id"
                       element={<SicknoteDetails />}
                  ></Route>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/sicknote" element={<Sicknote />}></Route>
                  <Route
                    path="/dashboadtakecareguardians"
                    element={<DashboardTakeCareGuardian />}
                  ></Route>
                  <Route path="/appointment" element={<Appointment />}></Route>
                  <Route
                    path="/takingcareguardian/list"
                    element={<TakingCareGuardianList />}
                  ></Route>
                  </Route>
              </Route>

            </Routes>
          </QueryClientProvider>
        </AuthProvider>
        </BrowserRouter>
    </>
  )
}

export default App;
