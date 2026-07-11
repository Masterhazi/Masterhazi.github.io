import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: ".env.local",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  try {
    console.log("GROQ Loaded:", !!process.env.GROQ_API_KEY);

    // Import AFTER dotenv has loaded
    const { buildNews } = await import("../services/newsService.js");

    console.log("Generating AI news...");

    const news = await buildNews();

    const outputDir = path.join(
      __dirname,
      "../public/generated"
    );

    await fs.mkdir(outputDir, {
      recursive: true,
    });

    await fs.writeFile(
      path.join(outputDir, "news.json"),
      JSON.stringify(news, null, 2),
      "utf8"
    );

    console.log("✅ public/generated/news.json created successfully.");

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

generate();