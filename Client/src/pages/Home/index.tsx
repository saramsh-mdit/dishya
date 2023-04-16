import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader, Text, Title } from "@mantine/core";

import VideoCard from "../../components/global/VideoCard";
import Search from "../../components/forms/Search";
import { getVideos } from "../../api/get";

const Home = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  //   if (isLoading) return (<div className='flex gap-4 justify-center mx-auto mt-8 max-w-md w-full'>
  //     <Loader variant='bars' size="sm" />
  //     <Text>Loading</Text>
  //   </div>)
  // if (isError)
  //   return (
  //     <div className='flex gap-4 justify-center mx-auto mt-8 max-w-md w-full'>
  //       <Text className='text-red-400'>Something Went Wrong.</Text>
  //     </div>
  //   );

  return (
    <div className="grid gap-8 w-full px-10 py-20">
      <Title order={2} className="text-center">
        Search Videos
      </Title>
      <Search />
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

export default Home;

export type VideoInfo = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  dateCreated: Date;
  dateModified: Date;
  tags: string;
  videoInfo: VideoFile;
  user: {
    _id: string;
    userName: string;
  };
};

export type VideoFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  _id: string;
  dateCreated: Date;
  dateModified: Date;
};
