import { Suspense, lazy } from 'react';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

// Home stays eager since it's the landing page almost everyone hits first.
// Everything else loads on demand so a first-time visitor isn't paying for
// code (3D scenes, the timeline lib, the news feed, etc.) they haven't
// navigated to yet.
const Experience = lazy(() => import('./components/Experience'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Projects = lazy(() => import('./components/Projects'));
const AINews = lazy(() => import('./components/AINews'));

const RouteFallback = () => (
  <div className="min-h-screen w-screen bg-black flex items-center justify-center text-white/60 text-sm">
    Loading…
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/experience' element={<Experience/>}/>
          <Route path='/ai-news' element={<AINews/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
