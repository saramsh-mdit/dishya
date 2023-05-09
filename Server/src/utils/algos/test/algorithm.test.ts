import { describe, expect, test } from "@jest/globals";

import recommendationGenerator, {
  VideoInfoRec,
  keywords,
} from "../recommendation";
import MergeSort from "../mergeSort";
import { CosineCalculator } from "../cosineAlgo";

//  MERGE SORT
const sampleUser = {
  _id: "01",
  userName: "saramsh",
};

const sampleDataGenerator = (
  id: string,
  title: string,
  tags: string
): VideoInfoRec => {
  return {
    _id: id,
    title: title,
    description: `Description of ${title} - ${id}`,
    thumbnail: "",
    dateCreated: new Date(),
    dateModified: new Date(),
    tags: tags,
    user: sampleUser,
  };
};

const keywordDataSet: keywords[] = [
  { name: "anime" },
  { name: "music" },
  { name: "movie" },
  { name: "test" },
];

const dataSet = [
  sampleDataGenerator("01", "Test 01", "test anime"),
  sampleDataGenerator("02", "Test 02", "test movie"),
  sampleDataGenerator("03", "Test 03", "test music"),
];

const ArrayData = [
  { score: 0.15, id: "01" },
  { score: 0.89, id: "02" },
  { score: 0.56, id: "03" },
];

describe("Algorithm Test", () => {
  test("Recommendataion Algorithm Test", async () => {
    const results = await recommendationGenerator(
      dataSet,
      sampleDataGenerator("01", "Test 01", "test anime"),
      keywordDataSet
    );
    expect(results).toHaveLength;
    if (results.length) {
      expect(results[0]).toHaveProperty("score");
      expect(results[0]).toHaveProperty("id");
    }
  });
  test("Cosine Similarity Test", () => {
    // Mock Data
    const sample1 = [0, 1, 0, 1, 0, 1];
    const sample2 = [1, 0, 0, 1, 0, 0];
    // Result
    const similarityResult = CosineCalculator(sample1, sample2);
    console.log(similarityResult);
    expect(similarityResult).toBeGreaterThanOrEqual(0);
    expect(similarityResult).toBeLessThanOrEqual(1);
  });

  test("Merge Sort", () => {
    const result = MergeSort(ArrayData);
    console.log(result);
    expect(result).toHaveLength;
    expect(result.length).toBe(3);
    expect(result[0].score > result[1].score).toBeTruthy;
  });
});
