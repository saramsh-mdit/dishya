import { AppDataSource } from "../../data-source";
import { Tags } from "../../entities/tags";
import { CosineCalculator } from "./cosineAlgo";
import MergeSort from "./mergeSort";

export type keywords = {
  name: string;
};

export type VideoInfoRec = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  dateCreated: Date;
  dateModified: Date;
  tags: string;
  user: {
    _id: string;
    userName: string;
  };
};

const getArrayOfString = (dataset: keywords[], userData: string) => {
  const userDataSets = userData.split(" ");
  const matrixArray = dataset?.map((item) => {
    if (userDataSets.includes(item.name)) return 1;
    return 0;
  });
  return matrixArray;
};

//
const keywordsDataSetGetter = async () =>
  (await AppDataSource.getRepository(Tags).find({
    select: {
      name: true,
    },
  })) as keywords[];

const recommendationGenerator = async (
  data: VideoInfoRec[],
  video: VideoInfoRec,
  keywordsDataSet?: keywords[]
) => {
  const keywordsData = keywordsDataSet || (await keywordsDataSetGetter());
  // Video
  const sourceMatrix = getArrayOfString(keywordsData, video.tags);
  sourceMatrix.push(1);
  // Data To Compare to
  const result = data?.map((item) => {
    const itemMatrix = getArrayOfString(keywordsData, item.tags);
    item.user._id === video.user._id ? itemMatrix.push(1) : itemMatrix.push(0);
    const score = CosineCalculator(itemMatrix, sourceMatrix);
    return { score, id: item._id };
  });
  console.log(`${new Date()} Recommendatation Result:`, result);
  return MergeSort(result.filter((data) => data.score != 0)).reverse();
};

export default recommendationGenerator;
