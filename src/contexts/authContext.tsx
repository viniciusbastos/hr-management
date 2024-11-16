import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";



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
interface CustomJwtPayload {
  id: string;
  useremail: string;
  role: string;
  name: string;
  posto: string;
}
type AuthContextData = {
  signIn(credetials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  function Logout() {
    localStorage.removeItem('token');
    const isAutenticated = false;
    navigate("/signin");
  }

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      const decodedToken: CustomJwtPayload = jwtDecode(token); // Use custom interface here
      setUser({ 
        id: decodedToken.id,
        useremail: decodedToken.useremail,
        role: decodedToken.role,
        name: decodedToken.name,
        posto: decodedToken.posto,   
      });
      setIsAuthenticated(true);
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
      const  token  = response.data.token;
      localStorage.setItem("token", token);
      const { id, useremail, role, name, posto } = jwtDecode(token);
      setUser({ 
        id: id,
        useremail: useremail,
        role: role,
        name: name,
        posto: posto,   
       });
       setIsAuthenticated(true)
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, Logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
