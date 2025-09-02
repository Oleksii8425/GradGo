import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "~/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  updateUser: (user: User | null) => void;
  updateToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const refreshAccessToken = async (): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5272/users/refresh-token", {
        method: "POST",
        credentials: "include"
      });

      if (!res.ok) {
        logout();
        return false;
      }

      const data = await res.json();
      updateUser(data.user);
      updateToken(data.token);
      return true;
    } catch (err) {
      console.error("Failed to refresh token", err);
      logout();
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    fetch("http://localhost:5272/users/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => { });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        updateUser,
        updateToken,
        refreshAccessToken,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
