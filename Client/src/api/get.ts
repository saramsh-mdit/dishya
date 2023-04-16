import { axiosInstance, axiosInstanceAuth } from "../config/axiosInstance";

export const postTag = (data: { name: string }) => {
  return axiosInstanceAuth.post("/api/tags", data);
};

export type tagData = {
  _id: string;
  name: string;
  dateCreated: Date;
  dateModified: Date;
};

export const getVideos = () => axiosInstance.get("/api/stream");

export const getTag = () => {
  return axiosInstanceAuth.get("/p-api/tags");
};

export const getCommentByVideoId = (id: string) => {
  return axiosInstanceAuth.get(`/p-api/comments/${id}`);
};

export const getMyVideos = () => axiosInstanceAuth.get(`/p-api/video/`);

export const getMyInfo = () => axiosInstanceAuth.get(`/p-api/user/info`);

export const getVideoRecommendation = (id: string) => {
  return axiosInstance.get(`/api/stream/recommendation/${id}`);
};

export const getVideoByQuery = (search: string) => {
  return axiosInstance.get(`/api/stream/search/${search}`);
};
