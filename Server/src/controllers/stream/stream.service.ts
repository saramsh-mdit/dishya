import { In } from "typeorm";

import { AppDataSource } from "../../data-source";
import { Views } from "../../entities/views";
import { Videos } from "../../entities/videos";
import SearchAlgorithm, { dataItem } from "../../utils/algos/searchAlgorithm";
import recommendationGenerator, {
  VideoInfoRec,
} from "../../utils/algos/recommendation";
// import { VideoInfo } from "../../entities/videoInfo";

const VideosSource = AppDataSource.getRepository(Videos);
// const VideosInfoSource = AppDataSource.getRepository(VideoInfo);
const viewsSource = AppDataSource.getRepository(Views);

export const increaseViews = async (videoId: string) => {
  try {
    const data = await viewsSource.findOne({
      where: {
        videoId,
      },
    });
    if (data) {
      data.views = data.views + 1;
      data.dateModified = new Date();
      viewsSource.save(data);
    } else {
      const viewItem = new Views();
      viewItem.views = viewItem.views + 1;
      viewItem.videoId = videoId;
      viewsSource.save(viewItem);
    }
  } catch (err) {
    throw { ...err };
  }
};

export const getSearchResult = async (search: string) => {
  try {
    const allVideos = (await VideosSource.find({
      select: {
        _id: true,
        title: true,
        description: true,
        tags: true,
      },
      relations: {
        videoInfo: true,
      },
    })) as dataItem[];
    const result = SearchAlgorithm(allVideos, search);
    const IdList = result?.map((item) => item?.id);
    const data = await VideosSource.find({
      relations: {
        videoInfo: true,
      },
      where: {
        _id: In(IdList),
      },
    });
    return data;
  } catch (e) {
    throw { ...e };
  }
};

export const getRecommendataion = async (id: string) => {
  try {
    const allVideos = (await VideosSource.find({
      select: {
        _id: true,
        title: true,
        description: true,
        tags: true,
        dateCreated: true,
        dateModified: true,
        user: {
          _id: true,
          userName: true,
        },
      },
      relations: {
        videoInfo: true,
        user: true,
      },
    })) as VideoInfoRec[];

    const video = (await VideosSource.findOne({
      select: {
        _id: true,
        title: true,
        description: true,
        tags: true,
        dateCreated: true,
        dateModified: true,
        user: {
          _id: true,
          userName: true,
        },
      },
      relations: {
        videoInfo: true,
        user: true,
      },
      where: {
        _id: id,
      },
    })) as VideoInfoRec;

    const result = recommendationGenerator(allVideos, video);
    // return result;
    const IdList = result?.map((item) => item?.id);
    const data = await VideosSource.find({
      relations: {
        videoInfo: true,
      },
      where: {
        _id: In(IdList),
      },
    });
    return data;
  } catch (e) {
    throw { ...e };
  }
};
