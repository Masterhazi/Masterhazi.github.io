import React from "react";
import vpn from '../assets/vpn.png';
import copeople from '../assets/copeople.png';
import Footer from './Footer';
import './Projects.css'; 

const ProjectCard = ({ image, title, description, git, liveDemo, technologies }) => {
    return (
        <div className="bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-xs sm:max-w-md md:max-w-lg project-card"> 
            {title === 'Snap Shot' && (
                <a href="#">
                    <img className="w-full rounded-t-lg h-auto object-cover" src={vpn} alt="" />
                </a>
            )}
            {title === 'Co People' && (
                <a href="#">
                    <img className="w-full rounded-t-lg h-auto object-cover" src={copeople} alt="" />
                </a>
            )}

            <div className="p-4 sm:p-6">
                <a href={liveDemo || '#'}>
                    <h5 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-500">
                        {title}
                    </h5>
                </a>
                <p className="font-normal text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className='m-2 sm:m-4 lg:m-6 flex justify-between items-center'> 
                <div className='flex flex-wrap gap-2 pl-2'>
                    {technologies.map((tag, index) => (
                        <p key={`${index}-${tag}`} className='text-[14px] text-blue-500'>
                            #{tag}
                        </p>
                    ))}
                </div>
        <div className="text-center">
          <a href={git} className="text-red-300 border border-gray-200 rounded-lg shadow p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300 block">
            GitHub
          </a>
          {liveDemo && (
            <a href={liveDemo} className="text-red-300 border border-gray-200 rounded-lg shadow mt-2 p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300 block">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
    return (
        <div className="bg-black mt-24"> 
            <div className="container mx-auto p-12 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {project.map((item, index) => (
                        <ProjectCard key={index} {...item} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};


export const project = [
    {
        title: 'Predicting Loan Defaulters - Spartan AI',
        description: 'Developed and deployed "Spartan AI," a machine learning model to predict loan defaulters for a home credit company, improving loan approval accuracy and minimizing financial risk.',
        image: 'https://raw.githubusercontent.com/Masterhazi/Spartan-AI/refs/heads/main/WhatsApp%20Image%202024-10-05%20at%2000.04.48_96941b43.jpg',
        git: 'https://huggingface.co/Masterhazi/Spartanai/tree/main', 
        liveDemo: 'https://hajiafridbaba.wixsite.com/spartan-ai',
        technologies: ['Data Cleaning', 'Feature Selection', 'Data Modeling', 'Data Visualization', 'Tableau', 'Seaborn', 'Matplotlib', 'PowerPoint Presentation', 'SQL', 'MLOps', 'Web Development']
    },
    
    {
        title: 'Cirrhosis Patient Survival Prediction',
        description: 'This project focused on survival outcomes for cirrhosis patients using clinical data. Employing feature engineering, outlier handling, and data scaling to build predictive models with Scikit-learn an RMSE score of 0.2 was obtained.',
        image: 'https://drive.google.com/file/d/1IfsFDeSX1T7hVcr-qUpWx-6oNJ34QehQ/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/Liver-Cirrhosis-patient-survival-prediction',
        technologies: ['Python', 'Scikit-learn', 'Feature Engineering', 'Data Scaling']
    },
    {
        title: 'Students Mental Health Analysis',
        description: 'This project analyzes factors influencing student mental health using data science techniques. It explores correlations between academic performance, social media usage, sleep patterns, and mental well-being to identify potential risk factors.', 
        image: 'https://th.bing.com/th/id/R.3f3f03b154caa926a825ced641dd8ca7?rik=wt2xnUCgVA%2b5%2bA&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2f360-3607349_ideas-14-cliparts-for-free-mental-health-png.png&ehk=DRIp6HeBpwTFjVM60aGcQqF5%2fh6DOfiA7ToIHhNGqmk%3d&risl=&pid=ImgRaw&r=0', 
        git: 'https://github.com/Masterhazi/Students-Mental-Health-analysis',
        technologies: ['My SQL','Python', 'Data Analysis', 'Mental Health', 'Data Visualization'] 
    },
    {
        title: 'MARS: Movie Automated Recommender System',
        description: 'An AI-powered movie recommendation engine built with Streamlit, Langchain, and Google Generative AI. Provides personalized movie suggestions based on synopsis similarity.',
        image: 'https://github.com/user-attachments/assets/be9f4e8d-c0a9-41d0-9cf4-bf4a991b4a1f', // Consider replacing with a more specific project image
        git: 'https://github.com/Masterhazi/Movie-Recommender-System', 
        liveDemo: 'https://marsmymovie.streamlit.app/',  // Added the live demo link
        technologies: ['Streamlit', 'Langchain', 'Google Generative AI', 'Python', 'Dotenv']
    },
    {
        title: 'MICA: AI Caption Maker',
        description: 'A visually appealing web app that uses Google\'s LLM to generate descriptive captions for uploaded or captured images. Offers feedback and poetic notes.',
        image: 'https://github.com/user-attachments/assets/270bca3d-acd7-412d-9fe9-279bb28bb8bf', // Added the image link
        git: 'https://github.com/Masterhazi/Image-captioning-model', // Updated GitHub link
        liveDemo: 'https://micaptions.streamlit.app/', // Added live demo link
        technologies: ['Streamlit', 'Google Generative AI', 'PIL', 'Python', 'dotenv']
    },

    {
      title: 'ASaRI: Article Search and RIS File Generator',
      description: 'A web application to search scholarly articles from Google Scholar and PubMed, and generate RIS files for citation management.  Includes AI-powered summaries.',
      image: '', // Add an image URL or path here. A logo or screenshot would be good.
      git: 'https://github.com/Masterhazi/asarii',
      liveDemo: 'https://asar-ii.streamlit.app/',
      technologies: ['Python', 'Streamlit', 'Google Generative AI', 'LangChain', 'Dotenv', 'Requests', 'Scholarly', 'PubMed API']
    },
    
    {
        title: 'AIDS Survival Prediction',
        description: 'This project focused on predicting AIDS patient survival based on their treatment regimens. Using Python and AutoML, I developed a model with a 92% accuracy rate, comparing the effectiveness of monotherapy versus combination therapy.',
        image: 'https://drive.google.com/file/d/1iFTeBHI81is63vbMwBPTzxJKFYjmx5xX/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/AIDS-Survival-Prediction',
        technologies: ['Python', 'Pandas', 'AutoML', 'Machine Learning']
    },
    {
      title: 'svAIsthi: Personalized Health Guidance with AI',
      description: 'An AI-powered web app that provides personalized guides for using medical devices based on user health history and medication. Uses Google\'s Generative AI.',
      image: '', // Add an image URL or path here
      git: 'https://github.com/Masterhazi/svAIsthi',
      liveDemo: 'https://svaisthi.streamlit.app/',
      technologies: ['Streamlit', 'Google Generative AI', 'PIL', 'Python']
    },
    {
        title: 'Phytochemical Composition Analysis',
        description: 'In this project, I extracted and analyzed the phytochemical composition of Nelumbo Nucifera seeds. The project aimed to identify antioxidant compounds with potential medicinal value through rigorous data management and analysis.',
        image: 'https://drive.google.com/file/d/1dSYtryI7zOQLc9ebpCY0fBcK6avSpLUp/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/Phytochemical-Composition-Analysis',
        technologies: ['Python', 'Data Management', 'Data Analysis']
    },
    {
        title: 'Beta-Lactam Resistance Analysis',
        description: 'This project involved a comprehensive survey and statistical analysis of beta-lactam resistant bacteria in drinking water across Anantapur Urban. I utilized data analysis, statistics, and feature engineering to identify correlations between water sources and the presence of resistant bacteria.',
        image: 'https://drive.google.com/file/d/1vdmulqHtfm19484JewUoOE5wnJrKgEA0/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/Beta-Lactam-Resistance-Analysis',
        technologies: ['Python', 'Data Analysis', 'Statistics', 'Data Visualization']

    },
    {
      title: 'WWE Player Performance Predictive Algorithm',
      description: 'A predictive model to forecast WWE match winners by combining historical match data with real-time event scraping powered by LLMs. Achieved 61% accuracy on unseen matchups.',
      image: '', // You'll need to find a good image for this project
      git: 'https://github.com/Masterhazi/WWE-player-performance-predictive-analysis', // Please provide the correct GitHub repository link
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Web Scraping', 'Hugging Face API', 'LLMs (Gemma)', 'BeautifulSoup', 'Data Wrangling']
    },
    {
      title: 'QuickLearnkit',
      description: 'A lightweight machine learning wrapper designed to simplify model imports and streamline workflows. Offers easy access to common supervised learning models.',
      image: '', // You'll need to find a suitable image
      git: 'https://github.com/Masterhazi/quicklearnkit', // Please provide the correct GitHub repository link
      liveDemo: '', //If there is a Live Demo Provide here
      technologies: ['Python', 'Machine Learning', 'Library Management']
    }
];

export default Projects;
