import { getFileContents } from "./helper";

function totalAdjacentsOne(grid: Array<Array<string>>): number {

  return 0;
}

export async function main() {
  const data = await getFileContents("2025_04");
  const grid = data.split("\n").map((line) => line.split(""));
  console.log("Adjacents One:", totalAdjacentsOne(grid));
}
