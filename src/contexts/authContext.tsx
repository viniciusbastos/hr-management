import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

type SignInCredentials = {
  email: string;
  password: string;
};
type User = {
  id: string;
  useremail: string;
  name: string;
  posto: string;
  role: string;
};

type AuthContextData = {
  signIn(credetials: SignInCredentials): Promise<void>;
  isAutenticated: boolean;
  Logout(): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAutenticated = !!user;
  const navigate = useNavigate();
  const location = useLocation();
  function Logout() {
    const isAutenticated = false;
    navigate("/signin");
  }

  useEffect(() => {
    const token: string = localStorage?.getItem("token");
    if (token) {
      const {id, useremail, role, name, posto } = jwtDecode(token);

      setUser({ 
        id: id,
        useremail: useremail,
        role: role,
        name: name,
        posto: posto,   
       });

      navigate(location ?? "/dashboard");
    } else {
      navigate("/signin");
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_API_URL + "/api/signin",
        {
          email,
          password,
        },
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      const { id, useremail, role, name, posto } = jwtDecode(token);

      setUser({ 
        id: id,
        useremail: useremail,
        role: role,
        name: name,
        posto: posto,   
       });
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAutenticated, Logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
