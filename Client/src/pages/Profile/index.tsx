import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Text, Title } from "@mantine/core";

import TagForm from "../../components/forms/Tags";
import PageWrapper from "../../components/wrapper/PageWrapper";
import { AuthContext } from "../../store/Context/authContext";
import { useQuery } from "@tanstack/react-query";
import { getMyVideos } from "../../api/get";
import { VideoInfo } from "../Home";
import VideoCard from "../../components/global/VideoCard";

const ProfilePage = () => {
  return (
    <PageWrapper>
      <section className="grid gap-6 p-4">
        <ProfileInfo />
        <Divider />
        <Controls />
        <MyVideos />
      </section>
    </PageWrapper>
  );
};

export default ProfilePage;

export const ProfileInfo = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <article className="p-4 rounded bg-gray-100">
      <Title className="text-blue-700 leading-none pb-2">
        {state.user.userName}
      </Title>
      <Text className="leading px-1 rounded-lg" fw={600}>
        Email: {state.user.email}
      </Text>
      <Text className="leading px-1 rounded-lg" fw={600}>
        Created: {new Date(state.user.dateCreated).toISOString().slice(0, 10)}
      </Text>
    </article>
  );
};

export const Controls = () => {
  const navigate = useNavigate();
  const [showTagForm, setShowTagForm] = React.useState<boolean>(false);
  const logOutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "login";
  };
  return (
    <article className="grid gap-2 text-gray-800">
      <Title order={3}>Controls</Title>
      <div className="flex gap-4 p-4 bg-blue-100 rounded">
        <Button onClick={() => navigate("/profile/upload")}>Add Video</Button>
        <Button color="green" onClick={() => setShowTagForm(!showTagForm)}>
          {showTagForm ? "Hide Tags Form" : "Add Tags"}
        </Button>
        <Button color="red" onClick={logOutHandler}>
          Log Out
        </Button>
      </div>
      {showTagForm && <TagForm />}
    </article>
  );
};

export const MyVideos = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["videos"],
    queryFn: getMyVideos,
  });
  return (
    <div className="grid text-gray-800">
      <Title order={3}>My Video</Title>
      <div className="mt-4 grid gap-4 gap-y-8 max-w-5xl w-full md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Text>Loading</Text>
        ) : (
          data?.data?.data?.map((item: VideoInfo) => {
            return <VideoCard key={item._id} {...item} />;
          })
        )}
      </div>
    </div>
  );
};
