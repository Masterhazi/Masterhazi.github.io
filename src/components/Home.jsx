import React, { useState, useEffect, useRef } from 'react';
import { name } from '../constants';
import { motion } from 'framer-motion';
import Background from './Background';
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

    // Cleanup 
    return () => {
      const scripts = document.querySelectorAll(
        'script[src^="https://cdn.botpress.cloud"], script[src^="https://files.bpcontent.cloud"]'
      );
      scripts.forEach((script) => script.remove());
    };
    // --- End Botpress Script Injection ---

    return () => {
      clearInterval(interval);
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
        className="hero relative h-[calc(100vh)] flex justify-center items-center text-white"
        id="hero"
      >
        <div className="spline-container">
          <Spline scene="https://prod.spline.design/oAi1vIcsBJ10XsVs/scene.splinecode" />
        </div>

        <div className="botpress-container" id="botpress-widget-container">
          {/* Botpress scripts will be loaded here by useEffect */}
        </div> 

        <div className="pt-4 h-36 rounded-3xl">
          <motion.h1 
            className="text-6xl sm:text-7xl font-extrabold mt-2"
            style={{ color: '#fefefe', marginTop: '-50px' }} //added margin
            animate={{ opacity: [0, 1] }} // Smoother fade-in effect
            transition={{ duration: 1.5, ease: 'easeInOut' }} // Adjust duration and easing
          >
            Hi, I'm{' '}
            <span className="gradient-text font-extrabold">
              {text}
            </span>
          </motion.h1>
          <p className="mt-3 text-xl">Believe Before Beginning.</p>
          <button
            onClick={handleAudioToggle}
            className="mt-2 px-4 py-2 rounded-full bg-black text-white translucent-button"
          >
            {audioPlaying ? 'Pause Audio⏸️' : 'Play Audio ▶️'}
          </button>
        </div>
      </div>

      <audio ref={audioRef} src="/background.wav" />
      <Footer />
    </div>
  );
};

export default Home;
