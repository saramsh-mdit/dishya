import React from "react";

import About from "../pages/About";
import FormPage from "../pages/Forms";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import VideoDetails from "../pages/Video";
import ProfilePage from "../pages/Profile";
import UploadVideoPage from "../pages/Profile/UploadVideoPage";
import AuthWrapper from "../components/wrapper/AuthWrapper";
import Random from "../pages/random";
import SearchList from "../pages/Home/SearchList";

const ROUTES = [
  {
    path: "/",
    key: "HOME_PAGE",
    exact: true,
    component: <Home />,
  },
  {
    path: "/:search",
    key: "SEARCH_PAGE",
    exact: true,
    component: <SearchList />,
  },
  {
    path: "/about",
    key: "ABOUT_PAGE",
    exact: true,
    component: <About />,
  },
  {
    path: "/video/:id",
    key: "VIDEO_PAGE",
    exact: true,
    component: <VideoDetails />,
  },
  {
    path: "/form",
    key: "FORM_PAGE",
    exact: true,
    component: <FormPage />,
  },
  {
    path: "/login",
    key: "LOGIN_PAGE",
    exact: true,
    component: <LoginPage />,
  },
  {
    path: "/register",
    key: "REGISTER_PAGE",
    exact: true,
    component: <RegisterPage />,
  },
  {
    path: "/profile",
    key: "PROFILE_PAGE",
    exact: true,
    component: (
      <AuthWrapper>
        <ProfilePage />
      </AuthWrapper>
    ),
  },
  {
    path: "/profile/upload",
    key: "UPLOAD_VIDEO_PAGE",
    exact: true,
    component: (
      <AuthWrapper>
        <UploadVideoPage />
      </AuthWrapper>
    ),
  },
  {
    path: "/random",
    key: "RANDOM_PAGE",
    exact: true,
    component: <Random />,
  },
];

export default ROUTES;
