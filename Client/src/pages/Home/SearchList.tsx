import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader, Text, Title } from "@mantine/core";

import VideoCard from "../../components/global/VideoCard";
import Search from "../../components/forms/Search";
import { getVideoByQuery } from "../../api/get";
import { VideoInfo } from ".";
import { useParams } from "react-router-dom";

const SearchList = () => {
  const { search } = useParams();
  const { isLoading, isError, data } = useQuery({
    queryKey: [`videos-{search}`],
    queryFn: () => getVideoByQuery(search!),
  });
  if (data) console.log(data?.data);
  return (
    <div className="grid gap-8 w-full px-10 py-20">
      <Search />
      <Title order={2}>Search Results for "{search}"</Title>
      <div className="grid gap-4 gap-y-8 max-w-5xl w-full md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <Text>Loading</Text>
        ) : isError ? (
          <Text>Error Occured</Text>
        ) : (
          data?.data?.map((item: VideoInfo) => {
            return <VideoCard key={item._id} {...item} />;
          })
        )}
      </div>
    </div>
  );
};

export default SearchList;
