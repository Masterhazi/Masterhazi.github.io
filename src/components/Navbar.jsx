import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/ai-news", label: "AI News" },
  { to: "/contact", label: "Contact" },
];

const RESUME_URL = "https://drive.google.com/file/d/1W8evk8EKAZVcg-fCg202ezhjzMouSSkI/view";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Adds a touch more shadow once the page has scrolled, so the floating
  // bar reads as "lifted" above content rather than blending into it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-4xl flex items-center justify-between gap-2 sm:gap-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl px-2.5 sm:px-3 py-2 text-white transition-shadow duration-300 ${
            scrolled ? "shadow-lg shadow-black/50" : "shadow-md shadow-black/20"
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-base sm:text-xl font-extrabold whitespace-nowrap pl-2 pr-1"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="hidden xs:inline">Haji Afrid</span>
            <span className="xs:hidden">HA</span>
          </Link>

          {/* Desktop pill nav — the active route gets a sliding glass pill
              with a soft pulsing glow so it's obvious at a glance where you are. */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-1 py-1">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 border border-white/20"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    >
                      <span className="absolute inset-0 rounded-full bg-pink-400/30 blur-md animate-pulse -z-10" />
                    </motion.span>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Resume CTA - desktop only */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-block text-sm font-semibold rounded-full px-4 py-1.5 bg-white text-black hover:bg-gray-200 transition-colors duration-200 whitespace-nowrap"
          >
            Resume
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-2xl focus:outline-none w-9 h-9 shrink-0 flex items-center justify-center active:scale-90 transition-transform duration-150"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 30,
              }}
              className="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-[#0F0F0F] border-l border-white/10 shadow-2xl z-[60] flex flex-col text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Explore</h2>

                <button
                  onClick={closeMobileMenu}
                  className="text-2xl text-white hover:text-purple-400 transition"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 px-6 py-8">
                <ul className="space-y-2">
                  {NAV_LINKS.map((item) => {
                    const isActive = pathname === item.to;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={closeMobileMenu}
                          className={`block rounded-xl px-5 py-4 text-lg transition ${
                            isActive
                              ? "bg-white/10 text-purple-300"
                              : "text-white hover:bg-white/5 hover:text-purple-300"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-6">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center rounded-xl bg-purple-600 hover:bg-purple-700 transition py-3 font-semibold"
                >
                  View Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
