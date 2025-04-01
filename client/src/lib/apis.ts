import axiosInstance from "./axiosInstance";

export const getMe = async() => {
  const response = await axiosInstance.get("/api/me");
  return response;
};

