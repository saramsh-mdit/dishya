import React from "react";
import { Icon } from "@iconify/react";
import { Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import CommentForm from "../../components/forms/Comment";
import VideoCard from "../../components/global/VideoCard";
import { getVideoRecommendation, getVideos } from "../../api/get";
import { VideoInfo } from "../Home";

type VideoInfoT = {
  title: string;
  description: string;
};

const VideoDetails = () => {
  const { id } = useParams();
  const [currentVideoInfo, setCurrentVideoInfo] = React.useState<VideoInfoT>({
    title: "Loading",
    description: "Loading",
  });
  const { isLoading, isError, data } = useQuery({
    queryKey: [`recommendation-${id}`],
    queryFn: () => getVideoRecommendation(id!),
  });

  useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    onSuccess: ({ data }) => {
      console.log(data?.data);
      data?.data?.forEach((item: VideoInfo) => {
        if (item?._id === id)
          setCurrentVideoInfo({
            title: item.title,
            description: item.description,
          });
      });
    },
  });

  return (
    <div className="flex w-full gap-6 p-4">
      <section className="w-full grid gap-4">
        <div>
          <video
            className="w-full h-[500px] object-contain border border-solid border-gray-400 rounded-lg"
            src={`http://localhost:3400/api/stream/${id}`}
            controls={true}
            crossOrigin="anonymous"
          />
          <div className="grid gap-2">
            <Title order={2}>{currentVideoInfo.title}</Title>
            <Text className="p-2 text-sm bg-gray-200 rounded">
              {currentVideoInfo.description}
            </Text>
            <div className="flex gap-8 text-gray-700">
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-900">
                <Icon icon="mdi:like" hFlip={true} />
                <Text>Likes</Text>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-blue-900">
                <Icon icon="material-symbols:comment-rounded" />
                <Text>Comments</Text>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Title order={3}>Comments</Title>
          <CommentForm videoId="id" />
        </div>
      </section>
      <aside className="flex flex-col gap-4 max-w-xs w-full">
        <Title order={4} fw={600} className="m-0 p-0">
          Recommended Videos
        </Title>
        <div className="grid gap-2 w-full">
          {data?.data?.map((item: VideoInfo) => {
            return <VideoCard key={item._id} {...item} />;
          })}
        </div>
      </aside>
    </div>
  );
};

export default VideoDetails;
