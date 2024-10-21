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
  const [color, setColor] = useState('linear-gradient(90deg, #00BFFF, #1E90FF)'); // Initial gradient
  const [canChangeColor, setCanChangeColor] = useState(true); // Cooldown state

  const gradients = [
    'linear-gradient(90deg, #FF5733, #FFC300)',
    'linear-gradient(90deg, #DAF7A6, #FF33FF)',
    'linear-gradient(90deg, #FF33F6, #335CFF)',
    'linear-gradient(90deg, #FF8C00, #FFD700)',
    'linear-gradient(90deg, #00BFFF, #1E90FF)',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current < name.length) {
        ref.current++;
        setText((prevText) => prevText + name[ref.current - 1]);
      }
    }, 100);

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

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getRandomGradient = () => {
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const handleMouseMove = () => {
    if (canChangeColor) {
      const newGradient = getRandomGradient();
      setColor(newGradient); // Set to random gradient
      setCanChangeColor(false);
      setTimeout(() => setCanChangeColor(true), 500); // Reset cooldown
    }
  };

  const handleAudioToggle = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  return (
    <div
      className="area relative z-0 bg-black w-screen h-screen"
      onMouseMove={handleMouseMove} // Track mouse movement
    >
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
            animate={{ opacity: [0, 1] }} // Smoother fade-in effect
            transition={{ duration: 1.5, ease: 'easeInOut' }} // Adjust duration and easing
          >
            Hi, I'm{' '}
            <motion.span
              className="font-extrabold"
              style={{
                background: color, // Apply the gradient here
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent', // Make the text transparent to show the gradient
                transition: 'background 0.5s ease-in-out', // Smooth transition for the background
              }}
            >
              {text}
            </motion.span>
          </motion.h1>
          <p className="mt-3 text-xl">Believe Before Beginning.</p>
          <button
            onClick={handleAudioToggle}
            className="mt-2 px-4 py-2 rounded-full bg-black text-white translucent-button"
          >
            {audioPlaying ? 'Pause Audio ⏸️' : 'Play Audio ▶️'}
          </button>
        </div>
      </div>

      <audio ref={audioRef} src="/background.wav" />
      <Footer />
    </div>
  );
};

export default Home;
