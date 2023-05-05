import { axiosInstanceAuth } from "../config/axiosInstance";

export const deleteCommentByCommentId = (id: string) => {
  return axiosInstanceAuth.delete(`/api/comments/${id}`);
};

export const deleteVideobyId = (id: string) => {
  return axiosInstanceAuth.delete("/p-api/video/" + id);
};
