import React from "react";
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiScipy,
  SiScikitlearn,
  SiDjango,
  SiFastapi,
  SiStreamlit,
  SiDocker,
  SiGit,
  SiLinux,
} from "react-icons/si";
import { FaDatabase, FaFileExcel } from "react-icons/fa";
import "./TechMarquee.css";

// Row 1: core languages, libraries, and tooling — anything with a
// recognizable brand mark gets its icon, everything else falls back
// to a plain dot inside the Chip component below.
const ROW_1 = [
  { label: "Python", Icon: SiPython },
  { label: "SQL", Icon: FaDatabase },
  { label: "Pandas", Icon: SiPandas },
  { label: "NumPy", Icon: SiNumpy },
  { label: "SciPy", Icon: SiScipy },
  { label: "Scikit-learn", Icon: SiScikitlearn },
  { label: "Statsmodels" },
  { label: "Django", Icon: SiDjango },
  { label: "FastAPI", Icon: SiFastapi },
  { label: "Streamlit", Icon: SiStreamlit },
  { label: "Docker", Icon: SiDocker },
  { label: "Git", Icon: SiGit },
  { label: "Linux", Icon: SiLinux },
  { label: "Tableau" },
  { label: "Power BI" },
  { label: "Excel", Icon: FaFileExcel },
];

// Row 2: AI/LLM and ML concepts — these don't have brand logos, so they
// ride on the dot fallback. Long skill names get a short chip label with
// the full phrase available as a native tooltip on hover.
const ROW_2 = [
  { label: "RAG", title: "Retrieval-Augmented Generation" },
  { label: "Prompt Engineering" },
  { label: "LLM Evaluation", title: "LLM Evaluation & Regression Testing" },
  { label: "Embedding Pipelines" },
  { label: "Model Versioning" },
  { label: "FAISS Retrieval", title: "FAISS-based Semantic Retrieval" },
  { label: "Similarity Search" },
  { label: "Document Chunking" },
  { label: "Regression" },
  { label: "KNN" },
  { label: "Naïve Bayes" },
  { label: "Decision Trees" },
  { label: "Ensemble Learning" },
  { label: "Boosting" },
  { label: "Stacking" },
  { label: "KMeans" },
  { label: "Feature Selection", title: "Feature Selection (Mann–Whitney U)" },
  { label: "ROC-AUC Optimization" },
  { label: "Precision/Recall Tuning" },
  { label: "Feature Engineering" },
  { label: "Outlier Handling" },
  { label: "Imputation" },
  { label: "Scaling" },
  { label: "EDA", title: "Exploratory Data Analysis" },
  { label: "Web Scraping" },
  { label: "Virtual Machines" },
  { label: "CI Workflows", title: "Git-based CI Workflows" },
];

const Chip = ({ label, Icon, title }) => (
  <span
    title={title || label}
    className="tech-chip inline-flex items-center gap-2 shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:text-white hover:border-purple-400/40 hover:bg-white/10 transition-colors duration-200"
  >
    {Icon ? (
      <Icon className="text-base text-purple-300 shrink-0" />
    ) : (
      <span className="w-1.5 h-1.5 rounded-full bg-pink-400/70 shrink-0" />
    )}
    {label}
  </span>
);

const MarqueeRow = ({ items, reverse = false, duration = 32 }) => (
  <div className="marquee-track">
    <div
      className={`marquee-content ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--duration": `${duration}s` }}
    >
      {[...items, ...items].map((item, i) => (
        <Chip key={`${item.label}-${i}`} {...item} />
      ))}
    </div>
  </div>
);

const TechMarquee = () => (
  <div className="marquee-wrapper">
    <MarqueeRow items={ROW_1} duration={30} />
    <MarqueeRow items={ROW_2} reverse duration={46} />
  </div>
);

export default TechMarquee;
