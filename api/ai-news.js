import { buildNews } from "../services/newsService.js";

export default async function handler(req, res) {

  try {

    const news = await buildNews();

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate"
    );

    return res.status(200).json(news);

  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: "Unable to fetch AI news.",
    });

  }

}