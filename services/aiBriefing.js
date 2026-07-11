import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const CATEGORIES = [
    "LLMs",
    "Robotics",
    "Research",
    "Open Source",
    "Enterprise",
    "Policy",
    "Hardware",
    "General",
];

export async function generateBriefing(articles) {

    // Index is 0-based and MUST line up with the `candidates` array in
    // newsService.js — that's how the selected articles get mapped back
    // to their full data (link, image, pubDate, etc).
    const articleText = articles
        .map((article, index) => {

            return `
Article ${index}

Title:
${article.title}

Description:
${article.description}

Source:
${article.source}
`;
        })
        .join("\n-------------------------\n");

    const prompt = `
You are the editor of a daily AI newsletter.

You are given up to 50 of today's AI news articles, each with a 0-based
Article index.

Your job:

1. Ignore duplicate or near-duplicate stories (keep only the best version).
2. Select the 12 most important, highest-quality stories out of the whole set.
   Prioritize significance over recency — a bigger story from yesterday beats
   a minor one from an hour ago.
3. Classify each selected story into exactly one category from this list:
   ${CATEGORIES.join(", ")}.
4. Write an executive summary between 80 and 120 words covering the overall
   picture across the selected stories.
5. Write ONE interesting insight that connects today's news.
6. Write three short highlights.
7. Return ONLY valid JSON, no preamble, no markdown fences.

Required JSON format:

{
    "summary":"",
    "insight":"",
    "highlights":[
        "",
        "",
        ""
    ],
    "selection":[
        {"index":0,"category":"LLMs"},
        {"index":0,"category":"LLMs"}
    ]
}

"selection" must contain exactly 12 objects (fewer only if fewer than 12
articles were provided), ordered from most to least important, each with
the original Article index and its category.

Articles:

${articleText}
`;

    const completion = await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        temperature: 0.3,

        response_format: {
            type: "json_object",
        },

        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return JSON.parse(
        completion.choices[0].message.content
    );
}