import React from 'react';
import '../App.css';
import { services } from '../constants';
import ButtonLink from './ButtonLink';
import Footer from './Footer';

const ServiceCard = ({ service }) => (
  <div className='sm:w-[250px] w-full'>
    <div className='w-full green-pink-gradient p-[1px] rounded-[20px]'>
      <div className='rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col' style={{ background: '#151030' }}>
        <img src={service.icon} alt='some_icon' className='w-16 h-16 object-contain' />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {service.title}
        </h3>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div>
      <div id="about" className='bg-black h-full w-full text-white sm:flex sm:justify-around about py-12 mt-8 overflow-x-hidden'>
        <div className='flex flex-col justify-around'>
          <div className='sm:px-16 px-2'>
            <h2 className='text-4xl sm:text-5xl font-extrabold mt-2'>Introduction</h2>
            <p className='mt-3 mb-6 text-[17px] max-w-3xl leading-[30px]'>
              👨‍💻 Hi, I'm N. Haji Afrid Baba, a data science enthusiast with a solid background in pharmacy and a passion for uncovering data-driven insights. Currently pursuing my Post Graduate Program in Data Science Engineering. As a <a className='text-green-300 hover:text-green-500 duration-300' href='https://www.linkedin.com/in/contacthazi/' target='_blank'>data science professional</a>, I specialize in Python, machine learning, and advanced statistical analysis to solve complex problems.
              <br />
              When I'm not diving into data, I enjoy exploring the latest in tech, writing songs and stories, making <a className=' text-purple-300 hover:text-purple-400 duration-300' href="https://open.spotify.com/show/7EhDNH5CrsGOKIx05vVLgy?si=nkQKFZIJSa2Gklrbd1MhCA" target='_blank'>podcasts</a>, and sharing my learnings with the community on <a className=' text-purple-300 hover:text-purple-400 duration-300' href="https://medium.com/@hajiafridbaba" target='_blank'>Medium</a>. My projects and insights are available on <a className=' text-purple-300 hover:text-purple-400 duration-300' href="https://github.com/Masterhazi" target='_blank'>GitHub</a>.
              Outside of tech, I have a keen interest in public speaking and leadership, as reflected in my national elocution awards. I also love exploring new challenges and bringing creative ideas to life.
            </p>

            <ButtonLink
              url='https://drive.google.com/file/d/1ZNQnjhY7-2hkYU19ucPidfFzr5fGzZ_x/view?usp=drive_link'
              text='View Resume →'
              padding={`p-3`}
            />
          </div>
          <div className='mt-20 flex justify-center flex-wrap gap-7'>
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
