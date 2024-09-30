import React, { useState, useEffect, useRef } from 'react';
import { name } from '../constants';
import { motion } from "framer-motion";
import Background from './Background';
import Footer from './Footer';

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
    }, 500);
    return () => clearInterval(interval);
  }, [text]);

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
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="hero relative h-[calc(100vh)] flex justify-center items-center text-white" id="hero">
        <div className="pt-4 h-36 backdrop-blur-sm rounded-3xl">
          <h1 className="text-6xl sm:text-7xl font-extrabold mt-2">
            Hi, I'm 
            <span className="text-yellow-200 font-extrabold">{text}</span>
          </h1>
          <p className="mt-3 text-xl">Believe Before Beginning.</p>
          <button 
          onClick={handleAudioToggle} 
          className="mt-2 px-4 py-2 rounded-full bg-white text-black"
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
