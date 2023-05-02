import { axiosInstanceAuth } from "../config/axiosInstance";

export const deleteCommentByCommentId = (id: string) => {
  return axiosInstanceAuth.delete(`/api/comments/${id}`);
};
