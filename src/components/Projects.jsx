
import React from "react";
import vpn from '../assets/vpn.png'
import copeople from '../assets/copeople.png'
import Footer from './Footer'

const ProjectCard = ({ image, title, description, git, technologies }) => {
    return (
        <div className="max-w-sm sm:max-w-sm md:max-w-sm bg-gray-900 border border-neutral-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
            <div className='m-2 sm:m-4 lg:m-6 flex justify-between'>
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
                <a href={git} className="text-red-300 border border-gray-200 rounded-lg shadow p-1 sm:p-2 lg:p-3 hover:text-green-500 duration-300">GitHub</a>
            </div>
        </div>
    );
};
  
const Projects = () => {
    return (
        <div className="bg-black">
            <div className="flex flex-wrap gap-7 justify-center items-center m-12 p-12">
                {project.map((item, index) => (
                    <ProjectCard
                        key={index}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        links={item.links}
                        git={item.git}
                        technologies={item.technologies}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    );
}


export const project = [
    {
        title: 'Cirrhosis Patient Survival Prediction',
        description: 'An ongoing project where I am predicting survival outcomes for cirrhosis patients using clinical data. I am employing feature engineering, outlier handling, and data scaling to build predictive models with Scikit-learn.',
        image: 'https://drive.google.com/file/d/1IfsFDeSX1T7hVcr-qUpWx-6oNJ34QehQ/view?usp=drive_link',
        git: 'https://github.com/Masterhazi/Liver-Cirrhosis-patient-survival-prediction',
        technologies: ['Python', 'Scikit-learn', 'Feature Engineering', 'Data Scaling']
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
