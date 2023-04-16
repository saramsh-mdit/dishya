type arrayItem = { score: number; id: string };

const MergeSort = (items: arrayItem[]): arrayItem[] => {
  const halfLength = Math.ceil(items.length / 2);
  let low = items.slice(0, halfLength);
  let high = items.slice(halfLength);
  if (halfLength > 1) {
    low = MergeSort(low);
    high = MergeSort(high);
  }
  return merge(low, high);
};

const merge = (low: arrayItem[], high: arrayItem[]): arrayItem[] => {
  let indexLow = 0;
  let indexHigh = 0;
  let curIndex = 0;
  const merged = Array<arrayItem>(low.length + high.length);

  while (indexLow < low.length && indexHigh < high.length) {
    if (low[indexLow].score <= high[indexHigh].score) {
      merged[curIndex++] = low[indexLow];
      indexLow++;
    } else {
      merged[curIndex++] = high[indexHigh];
      indexHigh++;
    }
  }

  while (indexLow < low.length) {
    merged[curIndex++] = low[indexLow];
    indexLow++;
  }

  while (indexHigh < high.length) {
    merged[curIndex++] = high[indexHigh];
    indexHigh++;
  }
  return merged;
};

export default MergeSort;
