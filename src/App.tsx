import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Sun, Moon, Search, X, BookOpen, Image as ImageIcon, Video as VideoIcon, Share2, Download } from "lucide-react";

const YOUTUBE_ICON_SRC = new URL("./assets/images/YOUTUBE.png", import.meta.url).toString();
const SPOTIFY_ICON_SRC = new URL("./assets/images/spotify.png", import.meta.url).toString();

import { ARTICLES_DATA } from "./data";
import ArticlesSingleCard from "./components/ArticlesSingleCard";
import PosterSingleCard from "./components/PosterSingleCard";

type SectionType = "ARTICLE" | "POSTER" | "VIDEO";

const SECTION_OPTIONS: SectionType[] = ["ARTICLE", "POSTER", "VIDEO"];

const VIDEO_COVER_SRC = new URL("./assets/images/video thumbnail.jpg", import.meta.url).toString();

const DARK_THEME_BG_SRC = new URL(
  "./assets/images/dark_theme_background.jpeg",
  import.meta.url
).toString();

const LIGHT_THEME_BG_SRC = new URL(
  "./assets/images/light_theme_background.png",
  import.meta.url
).toString();


const YOUTUBE_URL = "https://www.youtube.com/watch?v=UfCuLj-alZM";
const SPOTIFY_URL = "https://open.spotify.com/episode/4f0vvrAsMdFPCLt90LkYor?si=a5fe8f6427d246b8&nd=1&dlsi=87067f628b0c42bb";



export default function App() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<SectionType>("POSTER");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return ARTICLES_DATA;
    }

    const q = searchQuery.toLowerCase();
    return ARTICLES_DATA.filter((art) => {
      return (
        art.headline.toLowerCase().includes(q) ||
        art.overview.toLowerCase().includes(q) ||
        art.mainBodyParagraphs.some((p) => p.toLowerCase().includes(q)) ||
        art.conclusion.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchExpanded) {
      searchInputRef.current?.focus();
    }
  }, [isSearchExpanded]);

  const handleVideoShare = useCallback(() => {
    const shareTitle = "From Inspiration to Forbes 30 Under 30: Apkash Gupta's Journey";
    const shareText = "Watch the exclusive video podcast preview featuring Apkash Gupta's operational insights and strategic journey.";

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareTitle} - ${shareText}`).catch(console.error);
    }
  }, []);

  const handleVideoDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = VIDEO_COVER_SRC;
    link.download = "apkash-gupta-podcast-preview.jpg";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  // Sync theme with local storage (Default to dark)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light") {
        return false;
      }
      if (stored === "dark") {
        return true;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {}
    }
  }, [isDark]);

  return (
    <div 
      id="clean-canvas-root" 
      className={`min-h-screen font-sans antialiased flex flex-col justify-between items-stretch transition-colors duration-300 relative overflow-x-hidden pb-12 isolate
        ${isDark ? "bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"}
      `}
    >
      <div className="pointer-events-none fixed inset-0 z-20 theme-fade-overlay" />

      {/* Theme background images + decorative gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dark theme background */}
        <img
          src={DARK_THEME_BG_SRC}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />

        {/* Light theme background */}
        <img
          src={LIGHT_THEME_BG_SRC}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-500 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
          draggable={false}
        />


        {/* Decorative gradient overlay for readability */}
        <div
          id="bg-ambient-gradient"
          className={`absolute inset-0 transition-opacity duration-500
            ${isDark ? "opacity-35 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.10),transparent_50%)]" : "opacity-45 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_50%)]"}
          `}
        />
      </div>

      {/* Header with Theme Toggle */}
      <header 
        id="clean-canvas-header" 
        className="w-full max-w-7xl mx-auto px-4 pt-6 pb-2 sm:px-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center relative z-10 select-none"
      >
        <h1 
          id="header-app-title"
          className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300 whitespace-normal sm:whitespace-nowrap [text-shadow:0_2px_10px_rgba(0,0,0,0.22)] dark:[text-shadow:0_2px_14px_rgba(99,102,241,0.25)]"
        >
          Welcome to Podcast Visualizer
        </h1>
        <div id="header-right-controls" className="flex items-center justify-end gap-3 w-full sm:w-auto">
          {/* Collapsible Search Button Wrapper */}
          <div 
            id="search-wrapper"
            className={`relative h-11 flex items-center rounded-xl border shadow-xs transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-md
              ${isSearchExpanded ? "w-full sm:w-[300px]" : "w-11 cursor-pointer hover:scale-[1.02] active:scale-95"}
              ${isDark 
                ? "bg-neutral-900/80 border-neutral-800 text-neutral-100 hover:border-neutral-700" 
                : "bg-white/80 border-neutral-200 text-neutral-900 hover:border-neutral-300"
              }
            `}
            onClick={() => {
              if (!isSearchExpanded) {
                setIsSearchExpanded(true);
              }
            }}
          >
            {/* Centered Search Icon */}
            <div className="w-11 h-11 flex items-center justify-center shrink-0">
              <Search className={`w-5 h-5 transition-colors duration-300 ${isDark ? "text-neutral-400" : "text-neutral-500"}`} />
            </div>

            {/* Input Field */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search...."
              tabIndex={isSearchExpanded ? 0 : -1}
              className={`w-full bg-transparent text-sm py-2 focus:outline-none transition-all duration-300 pr-10
                ${isSearchExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                ${isDark ? "text-neutral-100 placeholder-neutral-500" : "text-neutral-900 placeholder-neutral-400"}
              `}
            />

            {/* Close Icon Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop click from propagating and re-expanding container
                setIsSearchExpanded(false);
                setSearchQuery("");
              }}
              className={`absolute right-3 p-1 rounded-lg transition-all duration-300
                ${isSearchExpanded ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-75"}
                ${isDark 
                  ? "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800" 
                  : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                }
              `}
              aria-label="Collapse search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            id="theme-toggle-btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsDark((prev) => !prev);
            }}
            className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer select-none backdrop-blur-md
              ${isDark 
                ? "bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-neutral-100 hover:border-neutral-700" 
                : "bg-white/80 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300"
              }
            `}
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5 overflow-hidden">
              {/* Sun Icon (Visible in light mode) */}
              <span 
                className={`absolute inset-0 flex items-center justify-center transform transition-all duration-300 ${
                  isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              >
                <Sun className="w-5 h-5 text-amber-500 fill-amber-100" />
              </span>
              {/* Moon Icon (Visible in dark mode) */}
              <span 
                className={`absolute inset-0 flex items-center justify-center transform transition-all duration-300 ${
                  isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              >
                <Moon className="w-5 h-5 text-indigo-400 fill-indigo-950/40" />
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Dedicated Navigation Row */}
      <nav 
        id="section-nav"
        className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-8 flex justify-center items-center relative z-10 select-none"
      >
        <div 
          className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-full border transition-colors duration-300 backdrop-blur-md
            ${isDark ? "bg-neutral-900/60 border-neutral-800" : "bg-white/85 border-neutral-200/80"}
          `}
        >
          {SECTION_OPTIONS.map((section) => {
            const isActive = activeSection === section;
            const labels: Record<SectionType, string> = {
              ARTICLE: "Article",
              POSTER: "Poster",
              VIDEO: "Video"
            };
            
            return (
              <button
                key={section}
                id={`nav-btn-${section.toLowerCase()}`}
                type="button"
                onClick={() => {
                  setActiveSection(section);
                  // no-op: video play simulation removed

                }}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 cursor-pointer outline-none select-none text-xs sm:text-sm font-bold tracking-wide
                  ${isActive 
                    ? "shadow-md shadow-indigo-500/25 bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-500" 
                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60 border border-transparent"
                  }
                `}
              >
                {section === "ARTICLE" && <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                {section === "POSTER" && <ImageIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                {section === "VIDEO" && <VideoIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
                <span>{labels[section]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main 
        id="clean-canvas-content" 
        className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full relative z-10 py-6"
      >
        <div className="w-full max-w-4xl flex flex-col items-stretch justify-center">
          
          {/* Dynamic Content Sections */}
          <div className="transition-all duration-300">
            {activeSection === "ARTICLE" && (
              <ArticlesSingleCard articles={filteredArticles} isDark={isDark} searchQuery={searchQuery} />
            )}

            {activeSection === "POSTER" && (
              <div id="content-section-poster" className="w-full">
                <PosterSingleCard articles={filteredArticles} isDark={isDark} />
              </div>
            )}

            {activeSection === "VIDEO" && (
              <div 
                id="content-section-video"
                className={`p-6 sm:p-10 rounded-3xl border shadow-xl text-left transition-all duration-300 animate-fadeIn w-full max-w-2xl mx-auto relative overflow-hidden
                  ${isDark ? "bg-neutral-900 border-neutral-800 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.9)]" : "bg-white border-neutral-200/80 shadow-neutral-200/50"}
                `}
              >
                {/* Decorative background glows inside the unified card */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

                {/* 1. Global Title at the Beginning */}
                <div className="border-b border-neutral-100 dark:border-neutral-800/80 pb-6 mb-8 relative z-10 text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
                    From Inspiration to Forbes 30 Under 30: <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Apkash Gupta's Journey
                    </span>
                  </h2>
                  
                  <p className="mt-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                    Watch the exclusive video podcast interview detailing Apkash Gupta's operational insights and strategic journey.
                  </p>
                </div>

                {/* 2. Video Player Frame with Cover Image */}
                <div className="aspect-video w-full rounded-2xl bg-neutral-950 border border-neutral-800/50 relative overflow-hidden flex items-center justify-center group mb-6 z-10 shadow-lg">
                  {/* Generated Cover Image */}
                  <img
                    src={VIDEO_COVER_SRC}
                    alt="From Inspiration to Forbes 30 Under 30: Apkash Gupta's Journey podcast video cover with Raj Shamani and Apkash Gupta"
                    className="absolute inset-0 w-full h-full object-cover select-none z-0 transition-transform duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />

                  {/* Dark transparent gradient overlay for readability */}
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/35 transition-colors duration-300 pointer-events-none z-1" />
                </div>

                <div className="flex flex-wrap items-start justify-center gap-2.5 sm:gap-4 relative z-10 mt-2 w-full">
                  <div className="flex min-w-[56px] sm:min-w-[72px] flex-col items-center gap-2 text-center">
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
                        }`}
                    >
                      <img src={YOUTUBE_ICON_SRC} alt="" aria-hidden="true" className="w-5 h-5" />
                    </a>
                    <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">YouTube</span>
                  </div>

                  <div className="flex min-w-[56px] sm:min-w-[72px] flex-col items-center gap-2 text-center">
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
                        }`}
                    >
                      <img src={SPOTIFY_ICON_SRC} alt="" aria-hidden="true" className="w-5 h-5" />
                    </a>
                    <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">Spotify</span>
                  </div>

                  <div className="flex min-w-[56px] sm:min-w-[72px] flex-col items-center gap-2 text-center">
                    <button
                      type="button"
                      onClick={handleVideoShare}
                      title="Share Video Preview"
                      aria-label="Share Video Preview"
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

                  <div className="flex min-w-[56px] sm:min-w-[72px] flex-col items-center gap-2 text-center">
                    <button
                      type="button"
                      onClick={handleVideoDownload}
                      title="Download Video Preview"
                      aria-label="Download Video Preview"
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
            )}
          </div>

          <div id="clean-canvas-divider" className="w-16 h-[2px] bg-neutral-300 dark:bg-neutral-800 rounded-full animate-pulse mx-auto mt-12" />
        </div>
      </main>
    </div>
  );
}

