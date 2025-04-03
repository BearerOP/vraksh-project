import axiosInstance from "./axiosInstance";

export const getMe = async() => {
  const response = await axiosInstance.get("/api/me");
  return response;
};


export const checkUsername = async(username:string) => {
  const response = await axiosInstance.get(`/api/check-username?username=${username}`);
  return response;
}
