import { getFileContents } from "./helper";

function getHighestJoltageOne(sequence: number[]): number {
  const sequenceLength = sequence.length;
  let firstIndex = 0;
  let secondIndex = sequenceLength - 1;
  for (let i = 1; i < sequenceLength - 1; i++) {
    if (sequence[i] > sequence[firstIndex]) firstIndex = i;
  }
  for (let i = sequenceLength - 2; i > firstIndex; i--) {
    if (sequence[i] > sequence[secondIndex]) secondIndex = i;
  }
  return sequence[firstIndex] * 10 + sequence[secondIndex];
}


function getHighestJoltageTwo(sequence: number[]): number {
  const sequenceLength = sequence.length;
  const joltageLength = 12;
  const joltageIndexesArray = new Array(joltageLength).fill(-1);
  for (let i = 0; i < joltageLength; i++) {
    joltageIndexesArray[i] = (joltageIndexesArray[i - 1] ?? -1) + 1;
    for (
      let j = joltageIndexesArray[i];
      j <= sequenceLength - (joltageLength - i);
      j++
    ) {
      if (sequence[joltageIndexesArray[i]] < sequence[j])
        joltageIndexesArray[i] = j;
    }
  }
  return joltageIndexesArray.reduce(
    (acc, joltageIndexValue, currentIndex) =>
      acc +
      sequence[joltageIndexValue] *
        Math.pow(10, joltageLength - currentIndex - 1),
    0
  );
}

function getTotalJoltageOne(banks: number[][]): number {
  return banks.reduce((acc, bank) => acc + getHighestJoltageOne(bank), 0);
}

function getTotalJoltageTwo(banks: number[][]): number {
  return banks.reduce((acc, bank) => acc + getHighestJoltageTwo(bank), 0);
}

export async function main() {
  const data = await getFileContents("2025_03");
  const banks = data.split("\n").map((bank) => bank.split("").map(Number));
  const totalJoltageOne = getTotalJoltageOne(banks);
  const totalJoltageTwo = getTotalJoltageTwo(banks);
  console.log("Total joltage One:", totalJoltageOne);
  console.log("Total joltage Two:", totalJoltageTwo);
}
