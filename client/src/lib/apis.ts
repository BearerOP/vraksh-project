import { SocialIcon } from "@/utils/types";
import axiosInstance from "./axiosInstance";

export const getMe = async () => {
  const response = await axiosInstance.get("/api/me");
  return response;
};


export const checkUsername = async (username: string) => {
  const response = await axiosInstance.get(`/api/check-username?username=${username}`);
  return response;
}

export const getBranches = async () => {
  const response = await axiosInstance.get('/api/branches');
  return response;
}


export const createBranch = async (data: FormData) => {
  console.log("Creating branch with data:", data);

  const response = await axiosInstance.post('/api/branch', data
  );
  return response;
}

export const getBranch = async (username: string) => {
  const response = await axiosInstance.get(`/api/branch/username/${username}`);
  return response;
}

export const cloudinarySign = async (publicId: string, uploadPreset: string) => {
  const response = await axiosInstance.post('/api/cloudinary-signature', {
    public_id: publicId,
    upload_preset: uploadPreset,
  });
  return response;
}

export const updateBranchProfile = async (branchId: string, title: string, description: string, socialIcons:SocialIcon[]) => {
  const response = await axiosInstance.put(`/api/branch/${branchId}`, {
    name: title,
    description,
    socialIcons
  });
  return response;
}