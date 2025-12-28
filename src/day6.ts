import { getFileContents } from "./helper";

export async function partOne() {
  const data = await getFileContents("2025_06");
  const all = data.split("\n");
  const operatorLines = all.pop()!.trim().split(/\s+/);
  const numberLists = all.map((line) => line.trim().split(/\s+/).map(Number));
  let sum = 0;
  for (let index = 0; index < operatorLines.length; index++) {
    let currentResult = 0;
    switch (operatorLines[index]) {
      case "+":
        for (const numberList of numberLists) {
          currentResult += numberList[index];
        }
        break;
      case "*":
        currentResult = 1;
        for (const numberList of numberLists) {
          currentResult *= numberList[index];
        }
        break;
    }
    sum += currentResult;
  }
  return sum;
}

export async function partTwo() {
  const data = await getFileContents("2025_06");
  const all = data.split("\n");
  const operatorLines = all.pop()!.trim().split(/\s+/);
  const numberLists = all;
  let sum = 0;
  let operatorIndex = 0;
  let currentResult = 0;
  for (let index = 0; index < numberLists[0].length; index++) {
    let numberToFormulate = "";

    for (const numberList of numberLists) {
      numberToFormulate += numberList[index];
    }

    if (numberToFormulate.trim().length === 0) {
      operatorIndex++;
      sum += currentResult;
      currentResult = 0;
      continue;
    }

    switch (operatorLines[operatorIndex]) {
      case "+":
        currentResult += Number(numberToFormulate.trim());
        break;
      case "*":
        if (currentResult === 0) {
          currentResult = 1;
        }
        currentResult *= Number(numberToFormulate.trim());
        break;
    }
  }
  sum += currentResult;

  return sum;
}

export async function main() {
  console.log("Day 6 Part One:", await partOne());
  console.log("Day 6 Part Two:", await partTwo());
}
