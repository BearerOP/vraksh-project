import { SocialIcon } from "@/utils/types";
import axiosInstance from "./axiosInstance";
import { Link } from "@/context/LinkContext";

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

export const updateBranchProfile = async (branchId: string, updates:{
  title?: string, description?: string, socialIcons?: SocialIcon[]
}) => {
  const response = await axiosInstance.put(`/api/branch/${branchId}`, updates);
  return response;
}

export const addItemToBranch = async (branchId: string, title: string, url: string) => {
  const response = await axiosInstance.post(`/api/branch/${branchId}/item`, {
    title,
    url,
    active: true,
    style: "classic",
    description: "" // Optional but good to provide
  });
  return response;
}

export const updateLink = async (item: Link) => {
  const response = await axiosInstance.put(`/api/branch/item/${item.id}`, item);
  return response;
}

export const deleteLink = async (branchId: string, itemId: string) => {
  const response = await axiosInstance.delete(`/api/branch/${branchId}/${itemId}`);
  return response;
}

export const reorderLinks = async (branchId: string, itemIds: string[]) => {
  const response = await axiosInstance.put(`/api/branch/reorder/${branchId}`, {
    itemIds
  });
  return response;
}

