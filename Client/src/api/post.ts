import { axiosInstance, axiosInstanceAuth } from "../config/axiosInstance";

export type login = {
  email: string;
  password: string;
};
export type register = {
  userName: string;
  password: string;
  email: string;
};
export type comment = {
  videoId: string;
  comment: string;
};
export type video = {
  image: File;
  title: string;
  description: string;
  tags: string;
};
export type videoFile = {
  video: File;
  videoId: string;
};

export const postLogin = (loginData: login) =>
  axiosInstance.post("/api/auth/login", loginData);

export const postRegister = (registerData: register) =>
  axiosInstance.post("/api/auth/register", registerData);

export const postComment = (commentData: comment) =>
  axiosInstanceAuth.post("/api/comments", commentData);

export const postTag = (tagData: { name: string }) =>
  axiosInstanceAuth.post("/p-api/tags", tagData);

export const postVideo = (videoData: video) => {
  const dataToUpload = new FormData();
  dataToUpload.append("title", videoData?.title);
  dataToUpload.append("description", videoData?.description);
  dataToUpload.append("image", videoData?.image);
  dataToUpload.append("tags", videoData?.tags);
  return axiosInstanceAuth.post("/p-api/video", dataToUpload);
};

export const UploadVideo = (videoFileData: videoFile) => {
  const dataToUpload = new FormData();
  dataToUpload.append("video", videoFileData?.video);
  dataToUpload.append("videoId", videoFileData?.videoId);
  return axiosInstanceAuth.post("/p-api/video/upload", dataToUpload);
};
