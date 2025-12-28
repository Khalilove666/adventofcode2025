import { getFileContents } from "./helper";

type IngredientRange = {
  start: number;
  end: number;
};

function findNumberNumberOfIngredientIds(
  ingredientRanges: IngredientRange[],
  ingredientIds: number[]
): number {
  let freshCount = 0;
  for (const id of ingredientIds) {
    for (const range of ingredientRanges) {
      if (id >= range.start && id <= range.end) {
        freshCount++;
        break;
      }
    }
  }
  return freshCount;
}

function findNumberOfAllFreshIngredientIds(
  ingredientRanges: IngredientRange[]
): number {
  let freshCount = 0;
  const sortedIngredientRanges = ingredientRanges.sort(
    (a, b) => a.start - b.start
  );
  const mergedRanges: IngredientRange[] = [sortedIngredientRanges[0]];
  sortedIngredientRanges.forEach((range, index) => {
    const lastMergedRange = mergedRanges[mergedRanges.length - 1];
    if (range.start <= lastMergedRange.end) {
      lastMergedRange.end = Math.max(lastMergedRange.end, range.end);
    } else {
      mergedRanges.push(range);
      freshCount += lastMergedRange.end - lastMergedRange.start + 1;
    }
  });
  freshCount +=
    mergedRanges[mergedRanges.length - 1].end -
    mergedRanges[mergedRanges.length - 1].start +
    1;
  return freshCount;
}

export async function main() {
  const data = await getFileContents("2025_05");
  const [rangeString, idString] = data.split("\n\n");

  const ingredientRanges = rangeString.split("\n").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
  });

  const ingredientIds = idString.split("\n").map(Number);

  const freshCount = findNumberNumberOfIngredientIds(
    ingredientRanges,
    ingredientIds
  );
  const allFreshCount = findNumberOfAllFreshIngredientIds(ingredientRanges);

  console.log("Number of fresh ingredient IDs:", freshCount);
  console.log("Number of all fresh ingredient IDs:", allFreshCount);
}
