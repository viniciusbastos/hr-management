import "./main.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./views/home";
import Details from "./views/details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/navbar";
import Dashboard from "./views/dashboard";
import FormUser from "./views/formUser";
import SignIn from "./views/signin";
import Vacation from "./views/vacation";
import SideBar from "./components/sidebar";
import VacationDetails from "./views/vacation/details";
import VacationMonth from "./views/vacation/month";

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
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-row">
            <SideBar />
            <main className="w-full">
              <Routes>
                <Route path="/details/:id" element={<Details />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/formUser" element={<FormUser />}></Route>
                <Route path="/signin" element={<SignIn />}></Route>
                <Route
                  path="/vacation/:id"
                  element={<VacationDetails />}
                ></Route>
                <Route path="/vacation" element={<Vacation />}></Route>
                <Route
                  path="/vacation/month/:month"
                  element={<VacationMonth />}
                ></Route>
              </Routes>
            </main>
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
