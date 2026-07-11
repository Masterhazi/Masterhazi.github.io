import React, { useEffect, useState, useCallback } from 'react';
import Footer from './Footer';
import FadeIn from './FadeIn';

const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const diffMs = Date.now() - date.getTime();
  const diffHrs = Math.floor(diffMs / 3600000);

  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h ago`;

  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

const NewsCard = ({ item }) => (
  <a
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group h-full bg-gray-900 border border-neutral-800 hover:border-purple-400/60 rounded-lg shadow flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
  >
    <div className="w-full h-40 shrink-0 overflow-hidden bg-black">
      {item.image ? (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-neutral-700 text-xs uppercase tracking-widest">
          {item.source}
        </div>
      )}
    </div>

    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold">
          {item.source}
        </span>

        <span className="text-[11px] text-gray-400">
          {timeAgo(item.pubDate)}
        </span>
      </div>

      <h3 className="text-white text-base sm:text-lg font-bold leading-snug mb-2 line-clamp-2 min-h-[2.6em] group-hover:text-purple-300 transition-colors duration-300">
        {item.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 min-h-[3.9em] flex-grow">
        {item.description}
      </p>

      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-white/5">
        {item.category && (
          <span className="text-[11px] font-medium text-purple-200 bg-purple-500/10 border border-purple-500/20 rounded-full px-2.5 py-1">
            {item.category}
          </span>
        )}

        {item.readTime && (
          <span className="text-[11px] text-gray-500">
            {item.readTime}
          </span>
        )}
      </div>
    </div>
  </a>
);

const AINews = () => {
  const [items, setItems] = useState([]);
  const [briefing, setBriefing] = useState(null);
  const [status, setStatus] = useState('loading');
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadFeeds = useCallback(async () => {
    setStatus('loading');

    try {
      const res = await fetch("/generated/news.json");

      if (!res.ok) {
        throw new Error('Failed to fetch AI news.');
      }

      const data = await res.json();

      if (!data.articles || data.articles.length === 0) {
        throw new Error("No news returned.");
      }
      setBriefing(data);
      setItems(data.articles);
      setStatus("ok");
      setLastUpdated(
        data.generated_at
          ? new Date(data.generated_at)
          : new Date()
      );
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadFeeds();
  }, [loadFeeds]);

  return (
    <div
      className="bg-black min-h-screen w-full text-white pt-24 sm:pt-28 pb-4 overflow-x-hidden"
      id="ai-news"
    >
      <div className="px-4 sm:px-8 md:px-16 max-w-6xl mx-auto">
        <p className="font-light">STAY IN THE LOOP</p>

        <div className="flex flex-wrap items-end justify-between gap-4 mt-2 mb-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            AI News.
          </h2>

          <button
            onClick={loadFeeds}
            disabled={status === 'loading'}
            className="text-sm border border-gray-600 rounded-full px-4 py-2 hover:border-purple-400 hover:text-purple-300 transition-colors duration-300 disabled:opacity-50"
          >
            {status === 'loading' ? 'Refreshing…' : '↻ Refresh Feed'}
          </button>
        </div>

        {status === 'loading' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-neutral-800 rounded-lg h-64 animate-pulse"
              />
            ))}
          </div>
        )}

        {status === 'ok' && (
          <>
            {briefing && (
              <FadeIn>
                <div className="mb-10 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-black to-black p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.25em] text-purple-300 mb-2">
                    EDITOR'S BRIEF
                  </p>

                  <p className="text-sm text-gray-400 mb-8">
                    Generated from today's leading AI publications.
                  </p>

                  <h3 className="text-2xl font-bold mb-4">
                    💡 Insight
                  </h3>

                  <p className="text-gray-300 leading-8 mb-8">
                    {briefing.insight}
                  </p>

                  <div className="border-t border-white/10 pt-8">
                    <h3 className="text-2xl font-bold mb-4">
                      📰 Summary
                    </h3>

                    <p className="text-gray-300 leading-8">
                      {briefing.summary}
                    </p>
                  </div>

                  <div className="border-t border-white/10 mt-8 pt-8">
                    <h3 className="text-2xl font-bold mb-4">
                      🔥 Top Highlights
                    </h3>

                    <ul className="space-y-3">
                      {briefing.highlights?.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <span className="text-purple-400 text-lg">
                            •
                          </span>

                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            )}

            <h3 className="text-2xl font-bold mb-6">
              Latest Headlines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {items.map((item, index) => (
                <FadeIn
                  key={`${item.link}-${index}`}
                  delay={(index % 3) * 0.1}
                  className="h-full"
                >
                  <NewsCard item={item} />
                </FadeIn>
              ))}
            </div>

            {lastUpdated && (
              <p className="text-xs text-gray-500 mt-8 text-center">
                Last updated {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </>
        )}

        {status === 'error' && (
          <div className="text-center py-16 text-gray-400">
            <p className="mb-4">
              Couldn't load the latest AI news right now.
            </p>

            <button
              onClick={loadFeeds}
              className="border border-gray-600 rounded-full px-5 py-2 hover:border-purple-400 hover:text-purple-300 transition-colors duration-300"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AINews;