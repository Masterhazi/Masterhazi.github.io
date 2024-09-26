import React from "react";
import vpn from '../assets/vpn.png'
import copeople from '../assets/copeople.png'
import Footer from './Footer'

const ProjectCard = ({ image, title, description, git, technologies }) => {
    return (
        <div className="bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 max-w-xs sm:max-w-md md:max-w-lg">
            {title=='Snap Shot' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={vpn} alt="" />
            </a>}
            {title=='Co People' && <a href="#">
                <img className="w-full rounded-t-lg h-auto object-cover " src={copeople} alt="" />
            </a>}
            <div className="p-4 sm:p-6">
                <a href="#">
                    <h5 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-500">{title}</h5>
                </a>
                <p className="font-normal text-sm sm:text-base md:text-lg text-gray-300 dark:text-gray-400">{description}</p>
            </div>
            <div className='m-2 sm:m-4 lg:m-6 flex justify-between items-center'> 
                <div className='flex flex-wrap gap-2 pl-2'>
                    {technologies.map((tag, index) => (
                        <p
                            key={`${index}-${tag}`}
                            className='text-[14px] text-blue-500'
                        >
                            #{tag}
                        </p>
                    ))}
                </div>
                <div className="text-center"> 
                    <a href={git} className="text-red-300 border border-gray-200 rounded-lg shadow p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300">GitHub</a>
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
}


export const project = [
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
        title: 'AIDS Survival Prediction',
        description: 'This project focused on predicting AIDS patient survival based on their treatment regimens. Using Python and AutoML, I developed a model with a 92% accuracy rate, comparing the effectiveness of monotherapy versus combination therapy.',
        image: 'https://drive.google.com/file/d/1iFTeBHI81is63vbMwBPTzxJKFYjmx5xX/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/AIDS-Survival-Prediction',
        technologies: ['Python', 'Pandas', 'AutoML', 'Machine Learning']
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

    }
]

export default Projects
