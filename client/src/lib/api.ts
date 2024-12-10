import API from "../config/apiClient";
import { SignUpFormData } from "@/components/modals/SignUp";
import { LoginFormData } from "@/components/modals/Login";

export const signup = async (data: SignUpFormData) =>
  API.post("/auth/signup", data);

export const login = async (data: LoginFormData) =>
  API.post("/auth/login", data);

export const logout = async () => API.get("/auth/logout");

export const getUser = async () => API.get("/auth/user");
