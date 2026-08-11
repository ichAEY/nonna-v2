import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const partsRoot = path.resolve(".asset-parts");

async function restore(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }

  const partFiles = entries
    .filter((entry) => entry.isFile() && entry.name.startsWith("part-"))
    .map((entry) => entry.name)
    .sort();

  if (partFiles.length) {
    const relativeTarget = path.relative(partsRoot, directory);
    const target = path.resolve(relativeTarget);
    await mkdir(path.dirname(target), { recursive: true });
    const chunks = await Promise.all(
      partFiles.map((name) => readFile(path.join(directory, name))),
    );
    await writeFile(target, Buffer.concat(chunks));
    return;
  }

  await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => restore(path.join(directory, entry.name))),
  );
}

await restore(partsRoot);
