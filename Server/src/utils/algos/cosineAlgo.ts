type cosinInput = number[];

export const CosineCalculator = (one: cosinInput, two: cosinInput) => {
  let dotProduct = 0;
  let oneSq = 0;
  let twoSq = 0;
  for (let a = 0; a < one.length; a++) {
    dotProduct += one[a] * two[a];
    oneSq += one[a] ** 2;
    twoSq += two[a] ** 2;
  }
  const result = dotProduct / (Math.sqrt(oneSq) * Math.sqrt(twoSq));
  return result;
};
