import { parse } from "csv-parse";
import fs from "node:fs";

const csvPath = new URL("./tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const parsedCsv = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function run() {
  const parsedLines = stream.pipe(parsedCsv);
  for await (const line of parsedLines) {
    const [title, description] = line;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

run();
