import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  login as loginApi,
  signup as signupApi,
  getCurrentUser,
} from "../api/authApi";

import { TOKEN_KEY } from "../api/axios";

const AuthContext = createContext(null);

// ==========================================
// Helper - Extract API Error Message
// ==========================================

const getApiErrorMessage = (
  error,
  fallbackMessage
) => {
  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail[0]?.msg || fallbackMessage;
  }

  return fallbackMessage;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [authLoading, setAuthLoading] =
    useState(false);

  // ==========================================
  // Restore Session
  // ==========================================

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem(
      TOKEN_KEY
    );

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const currentUser =
        await getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      console.error(error);

      localStorage.removeItem(TOKEN_KEY);

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  // ==========================================
  // Login
  // ==========================================

  const login = async (credentials) => {
    try {
      setAuthLoading(true);

      const response = await loginApi(
        credentials
      );

      localStorage.setItem(
        TOKEN_KEY,
        response.access_token
      );

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(
          error,
          "Login failed"
        ),
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================================
  // Signup
  // ==========================================

  const signup = async (userData) => {
    try {
      setAuthLoading(true);

      await signupApi(userData);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(
          error,
          "Signup failed"
        ),
      };
    } finally {
      setAuthLoading(false);
    }
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);

    setUser(null);
  };

  // ==========================================
  // Context Value
  // ==========================================

  const value = useMemo(
    () => ({
      user,
      loading,
      authLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
    }),
    [user, loading, authLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;