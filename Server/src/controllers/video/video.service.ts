import { AppDataSource } from "../../data-source";
import { Videos } from "../../entities/videos";
import { Users } from "../../entities/users";
import { VideoInfo } from "../../entities/videoInfo";
import { VideoType, VideoValidator } from "../../utils/validation";
import { SucessResponce, ErrorResponce } from "../../@types/responceTypes";

const VideosSource = AppDataSource.getRepository(Videos);
const VideosInfoSource = AppDataSource.getRepository(VideoInfo);
const UsersSource = AppDataSource.getRepository(Users);

export const getVideoById = async (id: string) => {
  try {
    const data = await VideosSource.findOne({
      where: {
        _id: id,
      },
      relations: {
        videoInfo: true,
      },
    });
    return data;
  } catch (err) {
    throw {
      ...err,
    };
  }
};

export const getVideos = async (id?: string) => {
  try {
    let allVideos;
    if (id)
      allVideos = await VideosSource.find({
        select: {
          _id: true,
          title: true,
          description: true,
          thumbnail: true,
          tags: true,
          dateCreated: true,
          dateModified: true,
          user: {
            _id: true,
            userName: true,
          },
        },
        relations: {
          user: true,
        },
        where: {
          user: {
            _id: id,
          },
        },
      });
    else {
      allVideos = await VideosSource.find();
    }
    return {
      message: "Request Successful",
      data: allVideos,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
      data: [],
    } as ErrorResponce;
  }
};

export const getLiveVideos = async () => {
  try {
    const dbData = await VideosSource.createQueryBuilder("videos")
      .leftJoin("videos.user", "user")
      .leftJoin("videos.videoInfo", "videoInfo")
      .select([
        "videos._id",
        "videos.title",
        "videos.description",
        "videos.thumbnail",
        "videos.tags",
        "videos.dateCreated",
        "videos.dateModified",
        "videos.videoInfo",
        "videoInfo.fieldname",
        "videoInfo.originalname",
        "videoInfo.encoding",
        "videoInfo.mimetype",
        "videoInfo.destination",
        "videoInfo.filename",
        "videoInfo.path",
        "videoInfo.size",
        "videoInfo.dateCreated",
        "user._id",
        "user.userName",
      ])
      .getMany();

    return {
      message: "Request Successful",
      data: dbData,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
      data: [],
    } as ErrorResponce;
  }
};

export const addVideo = async (
  videoData: VideoType,
  image: Express.Multer.File
) => {
  try {
    console.log(videoData, image);
    const parsedData: VideoType = await VideoValidator.parseAsync(videoData);

    const User = await UsersSource.findOne({
      where: {
        _id: parsedData.userId,
      },
    });
    const regX = /[//,"'`[\]]/g;

    const newVideo = new Videos();
    newVideo.user = User;
    newVideo.title = parsedData.title;
    newVideo.description = parsedData.description;
    newVideo.tags = parsedData.tags?.replace(regX, "");
    console.log(newVideo.tags);
    newVideo.thumbnail = JSON.stringify(image);
    const data = await VideosSource.save(newVideo);
    return {
      message: "User added successfully",
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
      data: [],
      error: err,
    } as ErrorResponce;
  }
};

export const deleteVideo = async (id: string) => {
  try {
    const video = await VideosSource.findOne({
      where: {
        _id: id,
      },
    });
    const data = await VideosSource.remove(video);

    return {
      message: "Deleted video successfully",
      data: data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
      data: [],
      error: err,
    } as ErrorResponce;
  }
};

export const addVideoInfo = async ({
  fileData,
  videoId,
}: {
  fileData: Express.Multer.File;
  videoId: string;
}) => {
  try {
    const video = await VideosSource.findOne({
      where: {
        _id: videoId,
      },
    });
    const newVideo = new VideoInfo();

    newVideo.fieldname = fileData?.fieldname;
    newVideo.originalname = fileData?.originalname;
    newVideo.encoding = fileData?.encoding;
    newVideo.mimetype = fileData?.mimetype;
    newVideo.destination = fileData?.destination;
    newVideo.filename = fileData?.filename;
    newVideo.path = fileData?.path;
    newVideo.size = fileData?.size;

    const savedVideo = await VideosInfoSource.save(newVideo);

    video.videoInfo = savedVideo;
    const data = await VideosSource.save(video);

    return {
      message: "Video file added successfully",
      data,
    } as SucessResponce;
  } catch (err) {
    console.log(err);
    throw {
      message: "Some Error Occured",
      data: [],
      error: err,
    } as ErrorResponce;
  }
};
