import { readFile } from "fs/promises";

export async function getFileContents(fileName: string): Promise<string> {
  try {
    return await readFile(`data/${fileName}`, "utf-8");
  } catch (error) {
    console.error(error);
    throw new Error("Problem reading the file");
  }
}
