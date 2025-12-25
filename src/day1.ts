import { getFileContents } from "./helper";

export function findNumberOfRotations(rotations: string[]): number {
  let dial = 50;
  let answer = 0;
  for (let i = 0; i < rotations.length; i++) {
    const direction = rotations[i][0];
    const rawSteps = parseInt(rotations[i].slice(1), 10);
    answer += Math.floor(rawSteps / 100);
    const steps = rawSteps % 100;
    if (direction === "L") {
      if (dial === 0) {
        dial = 100 - (steps - dial);
      } else if (steps > dial) {
        dial = 100 - (steps - dial);
        answer++;
      } else {
        dial -= steps;
        if (dial === 0) answer++;
      }
    } else if (direction === "R") {
      if (dial === 0) {
        dial = steps;
      } else if (steps + dial >= 100) {
        dial = steps + dial - 100;
        answer++;
      } else {
        dial += steps;
      }
    }

    console.log(`After ${rotations[i]} dial is at ${dial}`);
    console.log(`Total rotations: ${answer}`);
    console.log(`Direction: ${direction}`);
    console.log(`Step: ${steps}`);
    console.log("-----------------------------------------");
  }
  return answer;
}

export async function main() {
  const data = await getFileContents("2025_01");
  const rotationsCount = findNumberOfRotations(data.split("\n"));
  console.log(rotationsCount);
}
