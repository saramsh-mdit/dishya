import MergeSort from "./mergeSort";

export type dataItem = {
  _id: string;
  title: string;
  description: string;
  tags: string;
};

type resultData = {
  _id: string;
  title: number;
  description: number;
  tags: number;
};

const filteredData = (data: dataItem[]) =>
  data?.map((item) => {
    const regX = /(\[|\]|"|'|\/|\\ |,)/g;
    const { tags, ...d } = item;
    const newItem = {
      ...d,
      tags: JSON.stringify(tags).replace(regX, "")?.replace(",", " "),
    };
    return newItem;
  });

export function getMatch(source: string, data: string) {
  const queryString = typeof source === "string" ? source?.split(" ") : [];
  const dataString = data?.split(" ");

  let common = 0;
  queryString?.forEach((dString) => {
    dataString.forEach((qString) => {
      if (dString.toLowerCase().includes(qString.toLocaleLowerCase())) {
        common++;
      }
    });
  });
  return common;
}

function getCounter(dataSet: dataItem[], query: string) {
  const value = filteredData(dataSet).map((item) => {
    const title = getMatch(item.title, query);
    const description = getMatch(item.description, query);
    const tags = getMatch(item.tags, query);
    const result = {
      _id: item._id,
      title: title,
      description: description,
      tags: tags,
    };
    return result;
  });
  return value;
}

const markCalc = (current: number, maxValuePercent: number) => {
  if (current === 0) return 0;
  const value = current * (0.9 * maxValuePercent);
  return value < maxValuePercent ? value : maxValuePercent;
};

const calculateFinalResult = (data?: resultData[]) => {
  return data?.map((item) => {
    const totalScore =
      markCalc(item.title, 40) +
      markCalc(item.description, 30) +
      markCalc(item.tags, 30);
    return { score: totalScore / 100, id: item._id };
  });
};
export default function SearchAlgorithm(dataset: dataItem[], query: string) {
  const result = getCounter(dataset, query);
  const finalResult = calculateFinalResult(result);
  console.log(
    `"${query}" Search Result:`,
    MergeSort(finalResult.filter((data) => data.score != 0)).reverse()
  );
  return MergeSort(finalResult.filter((data) => data.score != 0)).reverse();
}
