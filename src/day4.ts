import { getFileContents } from "./helper";

function totalAdjacentsOne(grid: Array<Array<string>>): number {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ".") continue;
      const neigbors = countNeighbors(grid, row, col);
      if (neigbors < 4) count++;
    }
  }
  return count;
}

function totalRemovables(grid: Array<Array<string>>): number {
  let count = 0;
  let more = true;
  while (more) {
    let prevCount = count;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === ".") continue;
        const neigbors = countNeighbors(grid, row, col);
        if (neigbors < 4) {
          grid[row][col] = ".";
          count++;
        }
      }
    }
    if (prevCount === count) more = false;
  }
  return count;
}

function countNeighbors(
  grid: Array<Array<string>>,
  row: number,
  col: number
): number {
  const leftTop = grid[row - 1]?.[col - 1] === "@" ? 1 : 0;
  const top = grid[row - 1]?.[col] === "@" ? 1 : 0;
  const rightTop = grid[row - 1]?.[col + 1] === "@" ? 1 : 0;
  const left = grid[row]?.[col - 1] === "@" ? 1 : 0;
  const right = grid[row]?.[col + 1] === "@" ? 1 : 0;
  const leftBottom = grid[row + 1]?.[col - 1] === "@" ? 1 : 0;
  const bottom = grid[row + 1]?.[col] === "@" ? 1 : 0;
  const rightBottom = grid[row + 1]?.[col + 1] === "@" ? 1 : 0;
  return (
    leftTop + top + rightTop + left + right + leftBottom + bottom + rightBottom
  );
}

export async function main() {
  const data = await getFileContents("2025_04");
  const grid = data.split("\n").map((line) => line.split(""));
  console.log("Adjacents One:", totalAdjacentsOne(grid));
  console.log("Total Removables:", totalRemovables(grid));
}
