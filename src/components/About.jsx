import React, { useState } from 'react';
import '../App.css';
import { services, name } from '../constants';
import ButtonLink from './ButtonLink';
import Footer from './Footer';
import FadeIn from './FadeIn';
import TechMarquee from './TechMarquee';

const initials = (fullName = '') =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

// Drop your photo at public/profile.jpg (any image works, just keep that
// filename) and this renders it automatically — grayscale by default,
// full color on hover. Until that file exists, it falls back to an
// initials avatar so nothing looks broken.
const ProfilePhoto = () => {
  const [loaded, setLoaded] = useState(true);

  return (
    <div className="shrink-0 mx-auto sm:mx-0">
      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
        {loaded ? (
          <img
            src="/profile.jpg"
            alt={name}
            onError={() => setLoaded(false)}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-purple-200">
            {initials(name)}
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceCard = ({ service }) => (
  <div className="w-full">
    <div className="green-pink-gradient p-[1px] rounded-[20px] h-full">
      <div
        className="rounded-[20px] p-8 min-h-[240px] flex flex-col justify-center items-center text-center"
        style={{ background: '#151030' }}
      >
        <img
          src={service.icon}
          alt={service.title}
          className="w-16 h-16 object-contain mb-6"
        />

        <h3 className="text-white text-xl font-bold leading-snug">
          {service.title}
        </h3>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div>
      <div
        id="about"
        className="bg-black text-white pt-24 sm:pt-28 pb-16 overflow-x-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <ProfilePhoto />

              <div className="min-w-0">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-8">
                  Introduction
                </h2>

                <p className="text-[17px] leading-8 max-w-4xl text-gray-300">
                  👨‍💻 Hi, I'm <span className="text-white font-semibold">Hazi Aafrid Baba</span>,
                  an AI Engineer and Data Scientist passionate about building
                  intelligent products that solve real-world problems.
                  Over the years, I've worked across healthcare, artificial
                  intelligence, automation, and full-stack development—transforming
                  ideas into scalable applications.

                  <br /><br />

                  My work spans AI-powered resume parsing, healthcare assistants,
                  research automation, intelligent document generation, and modern
                  web applications. I enjoy designing clean architectures,
                  integrating large language models into practical workflows, and
                  creating software that feels intuitive to use.

                  <br /><br />

                  Outside of development, I enjoy exploring emerging technologies,
                  writing, public speaking, and continuously learning. Every project
                  I build teaches me something new, and I'm always looking for the
                  next meaningful challenge.

                </p>

                <div className="mt-8">
                  <ButtonLink
                    url="https://drive.google.com/file/d/1W8evk8EKAZVcg-fCg202ezhjzMouSSkI/view"
                    text="View Resume →"
                    padding="p-3"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-16">
              <p className="text-sm uppercase tracking-widest text-purple-300 mb-5">
                Tech Stack
              </p>
              <TechMarquee />
            </div>
          </FadeIn>

          <div className="mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <FadeIn
                  key={service.title}
                  delay={index * 0.1}
                >
                  <ServiceCard service={service} />
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;