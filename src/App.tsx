import { Suspense, useContext, lazy, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  BrowserRouter,
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './views/home'
import Details from './views/details'
import Dashboard from './views/dashboard'
import FormUser from './views/formUser'
import SignIn from './views/signin'
//import Vacation from "./views/vacation";
import VacationDetails from './views/vacation/details'
import VacationMonth from './views/vacation/month'
//import Courses from "./views/courses";
import CourseName from './views/courses/courseName'
import CourseDetails from './views/courses/details'
import Teste from './views/teste'
import { AuthContext, AuthProvider } from './contexts/authContext'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { AirOutlined, Login } from '@mui/icons-material'
import SidebarLayout from './routes/sideBarLayout'
import Sicknote from './views/sicknote'
const SicknoteDetails = lazy(() => import('./views/sicknote/details'))
import VacationCheck from './views/vacationcheck'
import NotFound from './views/Notfound'
import DashboardTakeCareGuardian from './views/takingcareofguardian/dashboardTakeCareGuardian'
import Appointment from './views/vacation/appointmentVacation'
import TakingCareGuardianList from './views/takingcareofguardian/list'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/loading'
import AI from './testeArtificialIteligence'
import ProcessTable from './components/processTable'
import SickNotes from './views/sicknote'
import SicknoteForm from './views/sicknote/newSicknote'
import AppointmentVacation from './views/vacation/appointmentVacation'
import WeaponsList from './views/weapons/list'
import TermoResponsabilidade from './views/weapons/termoderesponsabilidade'
import WeaponControlDashboard from './views/weapons/weaponsStatus'
import WeaponsDashboard from './views/weapons/dashboard'
import DashboardTeste from './views/dashtest'
import React from 'react'
import VacationsPlan from './views/vacation/vacationsPlan'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
      cacheTime: Number.POSITIVE_INFINITY,
    },
  },
})
function App() {
  const Users = lazy(() => import('./components/tablematerial'))
  const Dashboard = lazy(() => import('./views/dashboard'))
  const Vacation = lazy(() => import('./views/vacation/index'))
  const Courses = lazy(() => import('./views/courses/index'))
  const [loading, setLoading] = useState<boolean>(true)
  //  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/programacaoferias"
                element={<AppointmentVacation />}
              />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<SidebarLayout />}>
                  <Route path="users/details/:id" element={<Details />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/vacation/submit" element={<Teste />} />
                  <Route path="/ai" element={<AI />} />
                  {/* <Route path="users/" element={<Users />}/> */}
                  <Route
                    path="/users"
                    element={
                      <Suspense fallback={<Loading />}>
                        <Users />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <Suspense fallback={<Loading />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/process"
                    element={
                      <Suspense fallback={<Loading />}>
                        <ProcessTable />
                      </Suspense>
                    }
                  />
                  <Route path="/formUser" element={<FormUser />} />
                  <Route path="/vacation/:id" element={<VacationDetails />} />
                  <Route
                    path="/vacation"
                    element={
                      <Suspense fallback={<Loading />}>
                        <Vacation />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/sicknote"
                    element={
                      <Suspense fallback={<Loading />}>
                        <SickNotes />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/weapons"
                    element={
                      <Suspense fallback={<Loading />}>
                        <WeaponsList />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/vacationsplan"
                    element={
                      <Suspense fallback={<Loading />}>
                        <VacationsPlan />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/sicknoteform"
                    element={
                      <Suspense fallback={<Loading />}>
                        <SicknoteForm />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/weaponscontrol"
                    element={
                      <Suspense fallback={<Loading />}>
                        <WeaponControlDashboard />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/weaponsdashboard"
                    element={
                      <Suspense fallback={<Loading />}>
                        <WeaponsDashboard />
                      </Suspense>
                    }
                  />

                  <Route
                    path="/dashteste"
                    element={
                      <Suspense fallback={<Loading />}>
                        <DashboardTeste />
                      </Suspense>
                    }
                  />

                  <Route
                    path="/vacation/month/:month"
                    element={<VacationMonth />}
                  />
                  <Route
                    path="/weapons/termo/:id"
                    element={<TermoResponsabilidade />}
                  />

                  <Route path="/courses" element={<Courses />} />

                  <Route
                    path="/vacation/vacationcheck"
                    element={<VacationCheck />}
                  />

                  <Route path="/courses/:name" element={<CourseName />} />
                  <Route
                    path="/courses/details/:id"
                    element={<CourseDetails />}
                  />
                  <Route path="/sicknote/:id" element={<SicknoteDetails />} />
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/dashboadtakecareguardians"
                    element={<DashboardTakeCareGuardian />}
                  />
                  <Route path="/appointment" element={<Appointment />} />
                  <Route
                    path="/takingcareguardian/list"
                    element={<TakingCareGuardianList />}
                  />
                </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
