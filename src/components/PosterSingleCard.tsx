import { useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, Share2, Download } from "lucide-react";
import { Article } from "../data";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
const SPOTIFY_URL = "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";

const YOUTUBE_ICON_SRC = new URL("../assets/images/YOUTUBE.png", import.meta.url).toString();
const SPOTIFY_ICON_SRC = new URL("../assets/images/spotify.png", import.meta.url).toString();

const POSTER_JOURNEY_STEPS = [
  "Inspiration Starts the Journey",
  "Turn Ideas into Action",
  "Make the First Yes Easy",
  "Solve Problems Worth Paying For",
  "Sell Outcomes, Not Capabilities",
  "Trust Beats Reach",
  "Stop Selling Hours. Build Systems.",
  "Consistency Creates Momentum",
  "Learn Fast. Improve Faster.",
  "Build What Truly Matters"
];

interface PosterSingleCardProps {
  articles: Article[];
  isDark: boolean;
}

export default function PosterSingleCard({ articles, isDark }: PosterSingleCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If there are no articles available (e.g. due to search filter)
  if (articles.length === 0) {
    return (
      <div
        id="poster-single-card-empty"
        className={`w-full max-w-2xl mx-auto rounded-3xl border shadow-xl p-10 text-center transition-all duration-300
          ${isDark 
            ? "bg-neutral-900 border-neutral-800 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)]" 
            : "bg-white border-neutral-200 shadow-neutral-200/50"
          }
        `}
      >
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          No posters match your search query. Try resetting your search filters.
        </p>
      </div>
    );
  }

  // Ensure currentIndex stays in bounds if articles count changes dynamically (due to filtering)
  const activeIndex = currentIndex >= articles.length ? 0 : currentIndex;
  const currentArticle = articles[activeIndex];

  const posterImageSrc = useMemo(() => {
    // assets sequence must match slide order: 1.jpg -> ... -> 10.jpg
    // If there are fewer than 10 posters due to search, we still keep deterministic mapping.
    const safeIndex = ((activeIndex % 10) + 10) % 10; // 0..9
    return new URL(`../assets/images/${safeIndex + 1}.jpg`, import.meta.url).toString();
  }, [activeIndex]);

  const activePosterStep = POSTER_JOURNEY_STEPS[activeIndex] ?? POSTER_JOURNEY_STEPS[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareTitle = `From Inspiration to Forbes 30 Under 30: Apkash Gupta's Journey`;
    const shareText = `Check out Episode ${currentArticle.episodeNumber}: ${currentArticle.headline} - ${currentArticle.overview}`;
    
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareTitle} \n\n${shareText}`).catch(console.error);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    const link = document.createElement("a");
    link.href = posterImageSrc;
    link.download = `${currentArticle.id}.jpg`;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      id="poster-unified-single-card"
      className={`w-full max-w-2xl mx-auto rounded-3xl border shadow-xl p-4 sm:p-6 md:p-10 transition-all duration-300 relative overflow-hidden select-text
        ${isDark 
          ? "bg-neutral-900 border-neutral-800 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)]" 
          : "bg-white border-neutral-200/80 shadow-neutral-200/50"
        }
      `}
    >
      {/* Decorative background glows inside the unified card */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

      {/* 1. Global Title at the Beginning */}
      <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-6 mb-8 relative z-10 text-center sm:text-left">

        <div className="mb-4">
        </div>

        <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
          From Inspiration to Forbes 30 Under 30: <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Apkash Gupta's Journey
          </span>
        </h2>
        
        <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          Explore tactical designs and milestones immortalized in premium, custom ratio collectible artworks.
        </p>
      </div>

      {/* 2. Carousel Container with Navigation Buttons at Right and Left extremes */}
      <div className="relative w-full flex items-center justify-center my-8 z-10">
        
        {/* Left extreme navigation button */}
        <button
          type="button"
          onClick={handlePrev}
          title="Previous Poster"
          aria-label="Previous Poster"
          className={`absolute left-1 sm:-left-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border shadow-md cursor-pointer
            ${isDark 
              ? "bg-neutral-900/90 border-neutral-800 text-white hover:bg-indigo-600 hover:border-indigo-500" 
              : "bg-white/95 border-neutral-200 text-neutral-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* 3. Well-fitted 4:5 Active Poster Display Container */}
        <div className="w-full max-w-[260px] sm:max-w-[340px] px-2">
          <div className="mb-3 rounded-2xl border border-white/40 bg-white/25 dark:bg-neutral-950/40 backdrop-blur-xl shadow-lg shadow-black/10 px-3 py-2.5 relative z-10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-neutral-900 dark:text-white uppercase">
                {activeIndex + 1}/10
              </p>
              <p className="text-[11px] sm:text-xs font-medium text-neutral-900/85 dark:text-neutral-100/90 text-right leading-tight max-w-[170px] sm:max-w-[220px]">
                {activePosterStep}
              </p>
            </div>
          </div>

          <div
            id={`single-poster-display-${currentArticle.id}`}
            className={`w-full aspect-[4/5] rounded-[28px] overflow-hidden border shadow-xl relative flex flex-col justify-between p-6 transition-all duration-500 transform hover:scale-[1.01]
              ${isDark 
                ? "border-neutral-800/80 bg-neutral-950 shadow-indigo-950/20" 
                : "border-neutral-200 bg-white shadow-neutral-200/60"
              }
            `}
          >
            {/* Poster Image (sequence: 1.jpg..10.jpg) */}
            <img
              src={posterImageSrc}
              alt={`Poster visual ${activeIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover select-none z-0 opacity-100"
              draggable={false}
              loading="eager"
            />

          </div>
        </div>

        {/* Right extreme navigation button */}
        <button
          type="button"
          onClick={handleNext}
          title="Next Poster"
          aria-label="Next Poster"
          className={`absolute right-1 sm:-right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border shadow-md cursor-pointer
            ${isDark 
              ? "bg-neutral-900/90 border-neutral-800 text-white hover:bg-indigo-600 hover:border-indigo-500" 
              : "bg-white/95 border-neutral-200 text-neutral-800 hover:bg-indigo-600 hover:text-white hover:border-indigo-500"
            }
          `}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators / Active Tracker Dots */}
      <div className="flex items-center justify-center gap-2 mb-8 relative z-10">
        {articles.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer
              ${idx === activeIndex 
                ? "w-6 h-2 bg-neutral-700 dark:bg-neutral-200" 
              : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
              }
            `}
            title={`Go to slide ${idx + 1}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* 4. Horizontal Divider & Global Action Buttons for all posters at bottom */}
      <div className="border-t border-neutral-100 dark:border-neutral-800/80 pt-6 flex flex-wrap items-start justify-evenly gap-3 sm:gap-4 relative z-10">
        {/* YouTube */}
        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <a
            href={YOUTUBE_URL}
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

        {/* Spotify */}
        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <a
            href={SPOTIFY_URL}
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
            onClick={handleShare}
            title="Share Poster"
            aria-label="Share Poster"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer
              ${isDark 
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg" 
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Share</span>
        </div>

        <div className="flex min-w-[72px] flex-col items-center gap-2 text-center">
          <button
            type="button"
            onClick={handleDownload}
            title="Download Poster"
            aria-label="Download Poster"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border cursor-pointer
              ${isDark
                ? "bg-neutral-800 border-neutral-700/80 text-neutral-300 hover:bg-neutral-700 hover:text-white shadow-lg"
                : "bg-neutral-100 border-neutral-200/80 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 shadow-sm"
              }
            `}
          >
            <Download className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Download</span>
        </div>
      </div>
    </div>
  );
}
