import { getFileContents } from "./helper";

function getSumOfInvalidIds(
  rangeList: { start: number; end: number }[]
): number {
  let sum = 0;
  rangeList.forEach((range) => {
    for (let id = range.start; id <= range.end; id++) {
      if (isInvalidId(id)) {
        sum += id;
        console.log(`Invalid ID found: ${id}`);
      }
    }
  });
  return sum;
}

function isInvalidId(id: number): boolean {
  const idStr = id.toString();
  const length = idStr.length;
  for (let i = 2; i <= length; i++) {
    if (length % i !== 0) continue;
    const partLength = length / i;
    for (let j = 0; j <= length; j += partLength) {
      if (
        idStr.slice(j, j + partLength) !==
        idStr.slice(j + partLength, j + 2 * partLength)
      )
        break;
      if (j === length - 2 * partLength) return true;
    }
  }
  return false;
}

// function isInvalidId(id: number): boolean {
//   const idStr = id.toString();
//   const length = idStr.length;
//   if (length % 2 !== 0) return false;
//   const leftHalf = idStr.slice(0, Math.floor(length / 2));
//   const rightHalf = idStr.slice(Math.ceil(length / 2));
//   return leftHalf === rightHalf;
// }

export async function main() {
  const data = await getFileContents("2025_02");
  const rangeStrings = data.split(",");
  const rangeList = rangeStrings.map((rangeStr) => {
    const [startStr, endStr] = rangeStr.split("-");
    return { start: parseInt(startStr, 10), end: parseInt(endStr, 10) };
  });
  const sum = getSumOfInvalidIds(rangeList);
  console.log("Sum of invalid IDs:", sum);
}
