import axiosInstance from "./axios";

/**
 * Register a new user
 */
export const signup = async (userData) => {
  const response = await axiosInstance.post("/signup", userData);

  return response.data;
};

/**
 * Login user
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post("/login", credentials);

  return response.data;
};

/**
 * Fetch authenticated user
 */
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/me");

  return response.data;
};