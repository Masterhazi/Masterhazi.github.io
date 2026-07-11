import Parser from "rss-parser";
import { parse } from "node-html-parser";
import { generateBriefing } from "./aiBriefing.js";

const parser = new Parser({
  timeout: 10000,
});

// NOTE: official blogs change their feed URLs from time to time. Every fetch
// below is wrapped in Promise.allSettled (see buildNews), so if any one of
// these breaks it's simply skipped for that run instead of failing the build.
// Worth spot-checking this list every few months.
const FEEDS = [
  {
    source: "MIT Technology Review",
    url: "https://www.technologyreview.com/topic/artificial-intelligence/feed",
  },
  {
    source: "VentureBeat",
    url: "https://venturebeat.com/category/ai/feed/",
  },
  {
    source: "AI News",
    url: "https://www.artificialintelligence-news.com/feed/",
  },
  {
    source: "OpenAI",
    url: "https://openai.com/news/rss.xml",
  },
  {
    source: "Google DeepMind",
    url: "https://deepmind.google/blog/rss.xml",
  },
  {
    source: "Hugging Face",
    url: "https://huggingface.co/blog/feed.xml",
  },
  {
    source: "Microsoft AI",
    url: "https://blogs.microsoft.com/ai/feed/",
  },
  {
    source: "NVIDIA",
    url: "https://blogs.nvidia.com/feed/",
  },
  {
    source: "TechCrunch",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
  },
  {
    source: "Ars Technica",
    url: "https://arstechnica.com/ai/feed/",
  },
  {
    source: "The Verge",
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
  },
];

function stripHtml(html = "") {
  return parse(html).text.trim();
}

function extractImage(item) {
  if (item.enclosure?.url) return item.enclosure.url;

  if (item.enclosure?.link) return item.enclosure.link;

  if (item["media:content"]?.url)
    return item["media:content"].url;

  if (item["media:thumbnail"]?.url)
    return item["media:thumbnail"].url;

  if (item.content) {
    const root = parse(item.content);
    const img = root.querySelector("img");

    if (img) return img.getAttribute("src");
  }

  return "";
}

const WORDS_PER_MINUTE = 200;

function estimateReadTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

function normalize(item, source) {
  const fullText = stripHtml(
    item.contentSnippet ||
    item.summary ||
    item.content ||
    ""
  );

  // Prefer the full article body (content:encoded, when the feed provides
  // it) for the read-time estimate, since the trimmed snippet alone is
  // usually too short to give a meaningful minutes count.
  const bodyForReadTime = stripHtml(item.content || item["content:encoded"] || fullText);

  return {
    title: stripHtml(item.title || ""),

    description: fullText.slice(0, 180),

    readTime: estimateReadTime(bodyForReadTime || item.title || ""),

    link: item.link,

    pubDate: item.pubDate,

    image: extractImage(item),

    source,
  };
}

function normalizeTitleWords(title = "") {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2) // drop noise like "a", "to", "of"
  );
}

function titleSimilarity(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let overlap = 0;
  for (const word of a) {
    if (b.has(word)) overlap += 1;
  }
  return overlap / Math.min(a.size, b.size);
}

const DUPLICATE_THRESHOLD = 0.7;

// Removes near-duplicate stories (same event covered by multiple outlets),
// not just exact-URL repeats. Keeps the first occurrence it sees, so call
// this on an already-sorted (newest-first) list to keep the freshest copy.
function dedupeBySimilarity(items, getTitle = (x) => x.title) {
  const kept = [];
  const keptWords = [];

  for (const item of items) {
    const words = normalizeTitleWords(getTitle(item));
    const isDuplicate = keptWords.some(
      (existing) => titleSimilarity(words, existing) >= DUPLICATE_THRESHOLD
    );

    if (!isDuplicate) {
      kept.push(item);
      keptWords.push(words);
    }
  }

  return kept;
}

export async function buildNews() {

  const settled = await Promise.allSettled(
    FEEDS.map(async (feed) => {

      const rss = await parser.parseURL(feed.url);

      return rss.items.map((item) =>
        normalize(item, feed.source)
      );

    })
  );

  let articles = settled
    .filter((r) => r.status === "fulfilled")
    .flatMap((r) => r.value);

  const seen = new Set();

  articles = articles.filter((article) => {

    if (!article.link) return false;

    if (seen.has(article.link)) return false;

    seen.add(article.link);

    return true;

  });

  articles.sort(
    (a, b) =>
      new Date(b.pubDate) -
      new Date(a.pubDate)
  );

  // Same story covered by two different outlets shouldn't show up twice.
  articles = dedupeBySimilarity(articles);

  // Keep a larger candidate pool and let the model pick the strongest
  // stories, rather than just the newest ones.
  const candidates = articles.slice(0, 50);

  let briefing = {
    summary: "",
    insight: "",
    highlights: [],
    selection: null,
  };

  try {
    briefing = await generateBriefing(candidates);
  } catch (err) {
    console.error("AI briefing failed:", err);
  }

  const { selection, ...briefingMeta } = briefing;

  let finalArticles;

  if (Array.isArray(selection) && selection.length > 0) {
    finalArticles = selection
      .map(({ index, category }) => {
        const article = candidates[index];
        if (!article) return null;
        return { ...article, category: category || "General" };
      })
      .filter(Boolean)
      .slice(0, 12);
  }

  // Fall back to newest-12 if the model call failed or returned something
  // unusable, so the site never ships an empty news page.
  if (!finalArticles || finalArticles.length === 0) {
    finalArticles = candidates
      .slice(0, 12)
      .map((article) => ({ ...article, category: "General" }));
  }

  // Belt-and-suspenders: even if the model's own dedup instruction slips,
  // don't let two near-identical headlines both make the final cut.
  finalArticles = dedupeBySimilarity(finalArticles);

  return {
    generated_at: new Date().toISOString(),

    ...briefingMeta,

    articles: finalArticles,
  };
}