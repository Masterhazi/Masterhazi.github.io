import React, { useState } from "react";
import Footer from './Footer';
import FadeIn from './FadeIn';
import prepAIImage from '../assets/prepai-dashboard.png';
import './Projects.css';

// Google Drive "view" links (and a few other host pages) return an HTML page,
// not raw image bytes — using them as an <img src> just renders a broken icon.
// Anything that isn't a direct-looking image URL falls back to the gradient tile.
const isDirectImage = (url) => {
  if (!url) return false;
  if (url.includes('drive.google.com')) return false;
  return true;
};

const STATUS_STYLES = {
  active: { dot: 'bg-green-400', label: 'Active' },
  progress: { dot: 'bg-yellow-400', label: 'In Progress' },
  archived: { dot: 'bg-gray-500', label: 'Archived' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_STYLES[status] || STATUS_STYLES.archived;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
};

const GradientTile = ({ title, textClass = "text-3xl" }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900">
    <span className={`text-white/70 ${textClass} font-extrabold tracking-wide`}>
      {title.split(' ').slice(0, 2).map((w) => w[0]).join('')}
    </span>
  </div>
);

const LinkButtons = ({ links = [] }) => {
  if (!links.length) return null;
  return (
    <div className="flex gap-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className="flex-1 text-center text-red-300 border border-gray-700 rounded-lg shadow p-2 sm:p-3 hover:text-green-500 hover:border-green-500 duration-300 text-sm sm:text-base"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
};

const FeaturedProject = ({ image, title, description, technologies = [], status, links = [] }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = isDirectImage(image) && !imgFailed;

  return (
    <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black shadow-lg shadow-purple-900/10">
      <div className="grid md:grid-cols-2">
        <div className="w-full h-56 md:h-full min-h-[240px] bg-gray-900">
          {showImage ? (
            <img
              className="w-full h-full object-cover object-top"
              src={image}
              alt={title}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <GradientTile title={title} textClass="text-5xl" />
          )}
        </div>

        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
              Featured Project
            </span>
            <StatusBadge status={status} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-500 mb-3">
            {title}
          </h3>

          <p className="text-gray-300 text-sm sm:text-base mb-4">{description}</p>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {technologies.map((tag) => (
                <p key={tag} className="text-[13px] text-blue-400">#{tag}</p>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <LinkButtons links={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ image, title, description, technologies = [], status, links = [] }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = isDirectImage(image) && !imgFailed;

  return (
    <div className="group bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full max-w-xs sm:max-w-md md:max-w-lg project-card transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
      <div className="relative w-full h-40 shrink-0">
        {showImage ? (
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <GradientTile title={title} />
        )}

        {links.length > 0 && (
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-white border border-white/30 rounded-full px-4 py-1.5 hover:border-green-400 hover:text-green-400 transition-colors"
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h5 className="text-lg sm:text-xl font-bold text-white line-clamp-1">
            {title}
          </h5>
          <StatusBadge status={status} />
        </div>

        <p className="mt-1 text-sm text-gray-400 line-clamp-2">
          {description}
        </p>

        <div className="flex-grow" />

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {technologies.slice(0, 4).map((tag) => (
              <p key={tag} className="text-[12px] text-blue-400">#{tag}</p>
            ))}
            {technologies.length > 4 && (
              <p className="text-[12px] text-gray-500">+{technologies.length - 4} more</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const featured = project.find((item) => item.featured);
  const rest = project.filter((item) => !item.featured);

  return (
    <div className="bg-black pt-24 sm:pt-28 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 pb-12">
        {featured && (
          <FadeIn className="mb-14">
            <FeaturedProject {...featured} />
          </FadeIn>
        )}

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          Other Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center">
          {rest.map((item, index) => (
            <FadeIn key={item.title} delay={(index % 3) * 0.1} className="w-full h-full flex max-w-xs sm:max-w-md md:max-w-lg">
              <ProjectCard {...item} />
            </FadeIn>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export const project = [
    {
      title: 'PrepAI',
      description: 'Your personal AI Operating System for interview success — resume intelligence, persistent memory, autonomous prep planning, an AI question judge to cut hallucinations, and adaptive coaching, all in a native desktop app.',
      image: prepAIImage,
      featured: true,
      status: 'active',
      technologies: ['Python', 'Tauri', 'Flask', 'Claude', 'Gemini', 'Groq'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/prepAI' },
        { label: 'Release v2.0.0', url: 'https://github.com/Masterhazi/prepAI/releases/tag/v2.0.0' },
      ],
    },
    {
      title: 'ASaRI: Article Search and RIS File Generator',
      description: 'A web application to search scholarly articles from Google Scholar and PubMed, and generate RIS files for citation management. Includes AI-powered summaries.',
      image: '',
      status: 'active',
      technologies: ['Python', 'Streamlit', 'Google Generative AI', 'LangChain', 'Dotenv', 'Requests', 'Scholarly', 'PubMed API'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/asarii' },
        { label: 'Live Demo', url: 'https://asar-ii.streamlit.app/' },
      ],
    },
    {
      title: 'MICA: AI Caption Maker',
      description: "A visually appealing web app that uses Google's LLM to generate descriptive captions for uploaded or captured images. Offers feedback and poetic notes.",
      image: 'https://github.com/user-attachments/assets/270bca3d-acd7-412d-9fe9-279bb28bb8bf',
      status: 'active',
      technologies: ['Streamlit', 'Google Generative AI', 'PIL', 'Python', 'dotenv'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Image-captioning-model' },
        { label: 'Live Demo', url: 'https://micaptions.streamlit.app/' },
      ],
    },
    {
      title: 'MARS: Movie Automated Recommender System',
      description: 'An AI-powered movie recommendation engine built with Streamlit, Langchain, and Google Generative AI. Provides personalized movie suggestions based on synopsis similarity.',
      image: 'https://github.com/user-attachments/assets/be9f4e8d-c0a9-41d0-9cf4-bf4a991b4a1f',
      status: 'active',
      technologies: ['Streamlit', 'Langchain', 'Google Generative AI', 'Python', 'Dotenv'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Movie-Recommender-System' },
        { label: 'Live Demo', url: 'https://marsmymovie.streamlit.app/' },
      ],
    },
    {
      title: 'QuickLearnkit',
      description: 'A lightweight machine learning wrapper designed to simplify model imports and streamline workflows. Offers easy access to common supervised learning models.',
      image: '',
      status: 'active',
      technologies: ['Python', 'Machine Learning', 'Library Management'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/quicklearnkit' },
        { label: 'PyPI', url: 'https://pypi.org/project/quicklearnkit/' },
      ],
    },
    {
      title: 'WWE Player Performance Predictive Algorithm',
      description: 'A predictive model to forecast WWE match winners by combining historical match data with real-time event scraping powered by LLMs. Achieved 61% accuracy on unseen matchups.',
      image: '',
      status: 'archived',
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Web Scraping', 'Hugging Face API', 'LLMs (Gemma)', 'BeautifulSoup', 'Data Wrangling'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/WWE-player-performance-predictive-analysis' },
      ],
    },
    {
      title: 'Cirrhosis Patient Survival Prediction',
      description: 'This project focused on survival outcomes for cirrhosis patients using clinical data. Employing feature engineering, outlier handling, and data scaling to build predictive models with Scikit-learn an RMSE score of 0.2 was obtained.',
      image: '',
      status: 'archived',
      technologies: ['Python', 'Scikit-learn', 'Feature Engineering', 'Data Scaling'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Liver-Cirrhosis-patient-survival-prediction' },
      ],
    },
    {
      title: 'Students Mental Health Analysis',
      description: 'This project analyzes factors influencing student mental health using data science techniques. It explores correlations between academic performance, social media usage, sleep patterns, and mental well-being to identify potential risk factors.',
      image: 'https://th.bing.com/th/id/R.3f3f03b154caa926a825ced641dd8ca7?rik=wt2xnUCgVA%2b5%2bA&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2f360-3607349_ideas-14-cliparts-for-free-mental-health-png.png&ehk=DRIp6HeBpwTFjVM60aGcQqF5%2fh6DOfiA7ToIHhNGqmk%3d&risl=&pid=ImgRaw&r=0',
      status: 'archived',
      technologies: ['My SQL', 'Python', 'Data Analysis', 'Mental Health', 'Data Visualization'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Students-Mental-Health-analysis' },
      ],
    },
    {
      title: 'AIDS Survival Prediction',
      description: 'This project focused on predicting AIDS patient survival based on their treatment regimens. Using Python and AutoML, I developed a model with a 92% accuracy rate, comparing the effectiveness of monotherapy versus combination therapy.',
      image: '',
      status: 'archived',
      technologies: ['Python', 'Pandas', 'AutoML', 'Machine Learning'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/AIDS-Survival-Prediction' },
      ],
    },
    {
      title: 'Phytochemical Composition Analysis',
      description: 'In this project, I extracted and analyzed the phytochemical composition of Nelumbo Nucifera seeds. The project aimed to identify antioxidant compounds with potential medicinal value through rigorous data management and analysis.',
      image: '',
      status: 'archived',
      technologies: ['Python', 'Data Management', 'Data Analysis'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Phytochemical-Composition-Analysis' },
      ],
    },
    {
      title: 'Beta-Lactam Resistance Analysis',
      description: 'This project involved a comprehensive survey and statistical analysis of beta-lactam resistant bacteria in drinking water across Anantapur Urban. I utilized data analysis, statistics, and feature engineering to identify correlations between water sources and the presence of resistant bacteria.',
      image: '',
      status: 'archived',
      technologies: ['Python', 'Data Analysis', 'Statistics', 'Data Visualization'],
      links: [
        { label: 'GitHub', url: 'https://github.com/Masterhazi/Beta-Lactam-Resistance-Analysis' },
      ],
    },
];

export default Projects;
