import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Text, Title } from "@mantine/core";

import { VideoInfo } from "../../../pages/Home";

import style from "./style.module.scss";
import { Icon } from "@iconify/react";

const VideoCard = (props: VideoInfo) => {
  const [thumbnail, setThumbnail] = React.useState<thumbnailFile>();
  React.useEffect(() => {
    if (props?.thumbnail) {
      setThumbnail(JSON?.parse(props.thumbnail));
    }
  }, []);
  return (
    <Link to={`/video/${props?._id}`}>
      <div className=" border border-solid border-gray-300 p-1 flex gap-1 flex-col w-full rounded-lg pb-1 hover:border-blue-400">
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
        <div className="px-2">
          <div className="gap-1 grid text-gray-600 font-semibold">
            <Text>{props?.title}</Text>
            <div className="text-xs flex gap-2 justify-between items-center">
              <div className="flex gap-1 items-center">
                <Text>{0}</Text>
                <Icon icon="mdi:like-outline" />
              </div>
              <div className="flex gap-1 items-center">
                <Text>{0}</Text>
                <Icon icon="ic:outline-mode-comment" />
              </div>
              <div className="flex items-center gap-1">
                <Avatar size="xs" color="blue" radius="lg" variant="filled">
                  {props?.user?.userName?.split("")[0]?.toUpperCase()}
                </Avatar>
                <Text>{props?.user?.userName}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;

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
