import tigerLogo from "./assets/tiger_analytics_logo.jpg";
import datamaticsLogo from "./assets/1749589515829.jpg";

export const services = [
    {
        title: "Data Scientist",
        icon: 'https://csgeeek.github.io/web.png',
    },
    {
        title: "Health Care Professional",
        icon: 'https://csgeeek.github.io/web.png',
    },
    {
        title: "Technology Enthusiast",
        icon: 'https://csgeeek.github.io/web.png',
    },
];

export const name = 'Hazi Aafrid Baba';

// Flip this to control the badge on the Contact page.
// true  -> green "Open to new opportunities"
// false -> amber "Not currently open to opportunities"
export const isOpenToOpportunities = false;

// Day-to-day presence indicator shown next to your name on the homepage —
// separate from isOpenToOpportunities above (that's about your long-term
// job search status; this is more "am I around right now").
// true  -> green "Present"
// false -> gray "Away"
export const isPresent = false;

export const experiences = [
    {
        'company': 'Tiger Analytics',
        'role': 'Senior AI Engineer',
        'duration': 'Jul 2026 - Present',
        'logo': tigerLogo,
        'points': [
            'Currently building AI and analytics solutions at Tiger Analytics in Bangalore.',
            // TODO: swap in your real bullet points for this role — happy to help draft them if you share a few specifics.
        ],
        'url': 'https://www.tigeranalytics.com/',
    },
    {
        'company': 'Datamatics Technosoft Limited',
        'role': 'Data Scientist',
        'duration': 'Aug 2023 - Jun 2026 · 2 yrs 11 mos',
        'logo': datamaticsLogo,
        'points': [
            'Built end-to-end AI and ML solutions for HR automation, credit risk analysis, and healthcare intelligence.',
            'Integrated LLMs into production workflows, transforming unstructured data into actionable insights.',
            'Applied feature engineering and predictive modeling to improve decision speed across teams.',
            'Deployed and maintained APIs in Agile environments, reducing manual effort through scalable AI systems.',
        ],
        
    },
]



export const EMAIL_JS_SERVICE_ID = process.env.REACT_APP_EMAIL_JS_SERVICE_ID;
export const EMAIL_JS_TEMPLATE_ID = process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID;
export const EMAIL_JS_PUBLIC_KEY = process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY;
