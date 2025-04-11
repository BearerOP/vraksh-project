import { User } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define AuthContext type
export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

// Create context with correct default values
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to handle logout
  const logout = () => {
    document.cookie = "";
    setUser(null);
    setIsAuthenticated(false);
    console.log("User logged out");
    window.location.href =
      import.meta.env.VITE_VRAKSH_URL+"/auth/login" || "https://vraksh.bearerop.tech/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
