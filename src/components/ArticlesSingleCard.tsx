import { useState } from "react";
import { ChevronDown, ChevronUp, Share2, Download } from "lucide-react";
import { Article } from "../data";
const YOUTUBE_ICON_SRC = new URL("../assets/images/YOUTUBE.png", import.meta.url).toString();
const SPOTIFY_ICON_SRC = new URL("../assets/images/spotify.png", import.meta.url).toString();

const VIDEO_COVER_SRC = new URL("../assets/images/video thumbnail.jpg", import.meta.url).toString();

interface ArticlesSingleCardProps {
  articles: Article[];
  isDark: boolean;
  searchQuery: string;
}

export default function ArticlesSingleCard({ articles, isDark, searchQuery }: ArticlesSingleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const preserveScrollPosition = (toggle: () => void, event: React.MouseEvent<HTMLButtonElement>) => {
    const currentScrollY = window.scrollY;
    event.currentTarget.blur();
    toggle();

    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: "auto" });
    });
  };

  const handleShareAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = "From Inspiration to Forbes 30 Under 30: Apkash Gupta's Journey";
    const shareText = "Explore the tactical blueprints, mental shift parameters, and operational design patterns that shaped Apkash Gupta's journey.";
    
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareTitle} - ${shareText}`).catch(console.error);
    }
  };

  if (articles.length === 0) {
    return (
      <div
        id="articles-unified-single-card-empty"
        className={`w-full max-w-3xl mx-auto rounded-3xl border shadow-xl p-6 sm:p-10 transition-all duration-300 relative overflow-hidden text-center
          ${isDark 
            ? "bg-neutral-900 border-neutral-800 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)]" 
            : "bg-white border-neutral-200/80 shadow-neutral-200/50"
          }
        `}
      >
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          No matching insights found for "{searchQuery}". Try refining your search query.
        </p>
      </div>
    );
  }

  const firstArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div
      id="articles-unified-single-card"
      className={`w-full max-w-3xl mx-auto rounded-3xl border shadow-xl p-4 sm:p-6 md:p-10 transition-all duration-300 relative overflow-hidden select-text
        ${isDark 
          ? "bg-neutral-900 border-neutral-800 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)]" 
          : "bg-white border-neutral-200/80 shadow-neutral-200/50"
        }
      `}
    >
      {/* Decorative ambient gradient backdrop glow within the card */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      {/* Card Header: Main Title & Meta */}
      <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-6 mb-8 relative z-10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
            From Inspiration to Forbes 30 Under 30: <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Apkash Gupta's Journey
            </span>
          </h2>
          {searchQuery && (
            <span className="self-center sm:self-start text-[10px] font-mono px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
              Active Search
            </span>
          )}
        </div>
        
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Explore the tactical blueprints, mental shift parameters, and operational design patterns that shaped Apkash Gupta's journey to Forbes 30 Under 30 recognition.
        </p>
      </div>

      {/* Topics List Container */}
      <div className="relative z-10">
        <div className="group/topic transition-all duration-300">
          {/* First Article Title */}
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover/topic:text-indigo-500 dark:group-hover/topic:text-indigo-400 transition-colors duration-200">
            {firstArticle.headline}
          </h3>

          {/* Overview */}
          <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-4 leading-relaxed">
            {firstArticle.overview}
          </p>

          {/* Main Body - Paragraph 1 (Always Visible) */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {firstArticle.mainBodyParagraphs[0]}
          </p>

          {/* Toggle button: Read More (collapsed) / Read Less (expanded). When expanded, the button appears at the end of content. */}
          {!isExpanded && (
            <div className="mt-4 flex justify-start">
              <button
                type="button"
                onClick={(event) => preserveScrollPosition(() => setIsExpanded(true), event)}
                title="Read More"
                aria-label="Read More"
                className={`text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 transition-all duration-200 cursor-pointer py-2 px-4 rounded-xl border
                  ${isDark 
                    ? "text-indigo-400 border-indigo-500/30 hover:bg-indigo-950/40" 
                    : "text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  }
                `}
              >
                <span>Read More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Expandable Content Container (Reveals the rest of the first article & all remaining articles) */}

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded 
                ? "max-h-[12000px] opacity-100 mt-6" 
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            {/* First Article Remaining Paragraphs */}
            <div className="space-y-4">
              {firstArticle.mainBodyParagraphs.slice(1).map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* First Article Conclusion */}
            <div 
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 mt-6
                ${isDark 
                  ? "bg-neutral-950/40 border-neutral-800/80 text-neutral-200" 
                  : "bg-neutral-50 border-neutral-200 text-neutral-800"
                }
              `}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1.5 font-extrabold">
                Conclusion
              </span>
              <p className="text-sm font-medium italic leading-relaxed">
                {firstArticle.conclusion}
              </p>
            </div>

            {/* Remaining Articles/Episodes */}
            {remainingArticles.length > 0 && (
              <div className="space-y-8 mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800/60 divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {remainingArticles.map((article) => (
                  <div 
                    key={article.id}
                    id={`single-card-topic-${article.id}`}
                    className="pt-8 first:pt-0 group/subtopic transition-all duration-300"
                  >
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-2 group-hover/subtopic:text-indigo-500 dark:group-hover/subtopic:text-indigo-400 transition-colors duration-200">
                      {article.headline}
                    </h3>

                    {/* Overview */}
                    <p className="text-xs sm:text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-4 leading-relaxed">
                      {article.overview}
                    </p>

                    {/* Body Paragraphs */}
                    <div className="space-y-4">
                      {article.mainBodyParagraphs.map((para, pIdx) => (
                        <p 
                          key={pIdx} 
                          className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Conclusion */}
                    <div 
                      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 mt-6
                        ${isDark 
                          ? "bg-neutral-950/40 border-neutral-800/80 text-neutral-200" 
                          : "bg-neutral-50 border-neutral-200 text-neutral-800"
                        }
                      `}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1.5 font-extrabold">
                        Conclusion
                      </span>
                      <p className="text-sm font-medium italic leading-relaxed">
                        {article.conclusion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* End toggle when expanded */}
            <div className="mt-8 flex justify-start">
              <button
                type="button"
                onClick={(event) => preserveScrollPosition(() => setIsExpanded(false), event)}
                title="Read Less"
                aria-label="Read Less"
                className={`text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 transition-all duration-200 cursor-pointer py-2 px-4 rounded-xl border
                  ${isDark 
                    ? "text-indigo-400 border-indigo-500/30 hover:bg-indigo-950/40" 
                    : "text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                  }
                `}
              >
                <span>Read Less</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>


          </div>

        </div>
      </div>

      {/* Divider & Action Buttons */}
      <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800/60 flex flex-wrap items-start justify-evenly gap-3 sm:gap-4 relative z-10">
        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <a
            href={"https://www.youtube.com/watch?v=UfCuLj-alZM"}
            target="_blank"
            rel="noopener noreferrer"
            title="Watch on YouTube"
            aria-label="Watch on YouTube"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer no-underline
              ${isDark
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <img src={YOUTUBE_ICON_SRC} alt="" aria-hidden="true" className="w-5 h-5" />
          </a>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">YouTube</span>
        </div>

        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <a
            href={"https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb"}
            target="_blank"
            rel="noopener noreferrer"
            title="Listen on Spotify"
            aria-label="Listen on Spotify"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer no-underline
              ${isDark
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <img src={SPOTIFY_ICON_SRC} alt="" aria-hidden="true" className="w-5 h-5" />
          </a>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Spotify</span>
        </div>

        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <button
            type="button"
            onClick={handleShareAll}
            title="Share Gupta's Journey Series"
            aria-label="Share Gupta's Journey Series"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer
              ${isDark
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Share</span>
        </div>

        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const link = document.createElement("a");
              link.href = VIDEO_COVER_SRC;
              link.download = "podcast-video-cover.jpg";
              link.rel = "noopener";
              document.body.appendChild(link);
              link.click();
              link.remove();
            }}
            title="Download Video Cover"
            aria-label="Download Video Cover"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer
              ${isDark
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <Download className="w-4.5 h-4.5" />
          </button>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Download</span>
        </div>
      </div>
    </div>
  );
}
