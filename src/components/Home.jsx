import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { name } from '../constants';
{/*import { isPresent } from '../constants';*/}
import { motion } from 'framer-motion';
import Footer from './Footer';
import './Home.css';
import Spline from '@splinetool/react-spline';

const Home = () => {
  const ref = useRef(0);
  const [text, setText] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current < name.length) {
        ref.current++;
        setText((prevText) => prevText + name[ref.current - 1]);
      }
    }, 150); // Reduced time interval for smoother feel

    // --- Botpress Script Injection ---
    const loadBotpressScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const secondScript = document.createElement('script');
        secondScript.src = 'https://files.bpcontent.cloud/2024/10/17/07/20241017075423-K2DOPNVU.js';
        secondScript.async = true;
        document.body.appendChild(secondScript);
      };
    };

    loadBotpressScript();
    // --- End Botpress Script Injection ---

    // Single combined cleanup: clears the typing interval AND removes the
    // injected Botpress scripts. (Previously these were two separate
    // `return` statements in the same effect, so only the first one ever
    // ran and the typing interval was never actually cleared.)
    return () => {
      clearInterval(interval);
      const scripts = document.querySelectorAll(
        'script[src^="https://cdn.botpress.cloud"], script[src^="https://files.bpcontent.cloud"]'
      );
      scripts.forEach((script) => script.remove());
    };
  }, []);

  const handleAudioToggle = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div className="area relative z-0 bg-black w-screen h-screen">
      <div
        className="hero relative flex justify-center items-center text-white"
        id="hero"
      >
        <div className="spline-container">
          <Spline scene="https://prod.spline.design/oAi1vIcsBJ10XsVs/scene.splinecode" />
        </div>

        <div className="botpress-container" id="botpress-widget-container">
          {/* Botpress scripts will be loaded here by useEffect */}
        </div> 

        <div className="pt-4 px-6 sm:px-12 w-full max-w-6xl mx-auto rounded-3xl flex justify-start">
          <div className="max-w-5xl text-left -translate-y-12">
            <motion.h1
              className="hero-title font-extrabold flex flex-wrap items-center gap-3"
              style={{ color: '#fefefe' }}
              animate={{ opacity: [0, 1] }} // Smoother fade-in effect
              transition={{ duration: 1.5, ease: 'easeInOut' }} // Adjust duration and easing
            >
              <span>
                Hi, I'm{' '}
                <span className="gradient-text font-extrabold">
                  {text}
                </span>
              </span>

              {/*
              <span
                className={
                  isPresent
                    ? "inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-green-300 align-middle"
                    : "inline-flex items-center gap-1.5 rounded-full border border-gray-500/30 bg-gray-500/10 px-3 py-1 text-xs sm:text-sm font-medium text-gray-400 align-middle"
                }
              >
                <span className="relative flex h-2 w-2">
                  {isPresent && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isPresent ? 'bg-green-400' : 'bg-gray-500'
                    }`}
                  />
                </span>
                {isPresent ? 'Present' : 'Away'}
              </span>*/}
            </motion.h1>
            <p className="mt-3 text-base sm:text-xl">Believe Before Beginning.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleAudioToggle}
                className="px-4 py-2 rounded-full bg-black text-white translucent-button text-sm sm:text-base active:scale-95 transition-transform"
              >
                {audioPlaying ? 'Pause Audio⏸️' : 'Play Audio ▶️'}
              </button>
              <Link
                to="/ai-news"
                className="px-4 py-2 rounded-full bg-black text-white translucent-button text-sm sm:text-base active:scale-95 transition-transform"
              >
                Explore AI News →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/background.wav" />
      <Footer />
    </div>
  );
};

export default Home;
