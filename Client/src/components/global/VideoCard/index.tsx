import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Text, Title } from "@mantine/core";

import { VideoInfo } from "../../../pages/Home";

import style from "./style.module.scss";
import { Icon } from "@iconify/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVideobyId } from "../../../api/delete";
import { toast } from "react-toastify";

const VideoCard = (props: VideoInfo) => {
  const [thumbnail, setThumbnail] = React.useState<thumbnailFile>();
  React.useEffect(() => {
    if (props?.thumbnail) {
      setThumbnail(JSON?.parse(props.thumbnail));
    }
  }, []);
  return (
    <a href={`/video/${props?._id}`}>
      <div className=" border-2 border-solid border-gray-300 p-1 flex gap-1 flex-col w-full rounded-lg pb-1 hover:border-blue-400">
        <div className="h-48 w-full bg-green-200 rounded-lg overflow-hidden">
          <img
            className={style.img}
            src={
              thumbnail
                ? `http://localhost:3400/uplodedData/${thumbnail?.filename}`
                : "public/vite.svg"
            }
            alt={props?.title}
          />
        </div>
        <div className="p-1">
          <div className="gap-2 flex justify-between text-gray-600 font-semibold">
            <Text>{props?.title}</Text>
            <div className="text-xs flex gap-2 justify-end items-center">
              <div className="flex items-center gap-2 ">
                <Avatar size="xs" color="blue" radius="lg" variant="filled">
                  {props?.user?.userName?.split("")[0]?.toUpperCase()}
                </Avatar>
                <Text>{props?.user?.userName}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;

export const VideoCardAdmin = (props: VideoInfo) => {
  const queryClient = useQueryClient();
  const [thumbnail, setThumbnail] = React.useState<thumbnailFile>();
  const deleteMutation = useMutation({
    mutationFn: () => deleteVideobyId(props?._id),
    onSuccess: () => {
      toast("Delete Sucessfull");
      queryClient.invalidateQueries(["videos"]);
    },
    onError: () => {
      toast("Delete Failed");
    },
  });

  React.useEffect(() => {
    if (props?.thumbnail) {
      setThumbnail(JSON?.parse(props.thumbnail));
    }
  }, []);

  return (
    <div className="border border-solid border-gray-300 p-1 flex gap-1 flex-col w-full rounded-lg justify-between pb-1">
      <div className="h-48 w-full bg-green-200 rounded-lg overflow-hidden">
        <Link to={`/video/${props?._id}`} className="h-full w-full">
          <img
            className={style.img}
            src={
              thumbnail
                ? `http://localhost:3400/uplodedData/${thumbnail?.filename}`
                : "public/vite.svg"
            }
            alt={props?.title}
          />
        </Link>
      </div>
      <div className="p-2">
        <div className="gap-1 grid text-gray-600 font-semibold">
          <Text className="select-none" lineClamp={2}>
            {props?.title}
          </Text>
          <Button
            onClick={() => deleteMutation.mutate()}
            color="red"
            variant="light"
            compact
          >
            Delete Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export type thumbnailFile = {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
};
