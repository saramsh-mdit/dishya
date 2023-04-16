import { CosineCalculator } from "./cosineAlgo";
import MergeSort from "./mergeSort";

type keywords = {
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

const keywordsData: keywords[] = [
  { name: "action" },
  { name: "drama" },
  { name: "film" },
  { name: "funny" },
  { name: "study" },
  { name: "movie" },
];

const getArrayOfString = (dataset: keywords[], userData: string) => {
  const matrixArray: number[] = [];
  const userDataSets = userData.split(" ");
  dataset?.forEach((item) => {
    if (userDataSets.some((userKey) => item.name.includes(userKey)))
      matrixArray.push(1);
    matrixArray.push(0);
  });
  return matrixArray;
};

// const storeResultInput = getArrayOfString(keywordsData, 'fun');
// const storeResultInputSecond = getArrayOfString(keywordsData, 'movie fun');
// console.log(storeResultInput, storeResultInputSecond);

const recommendationGenerator = (data: VideoInfoRec[], video: VideoInfoRec) => {
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
  return MergeSort(result.filter((data) => data.score != 0)).reverse();
};

export default recommendationGenerator;
