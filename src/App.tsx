import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Achievements from './pages/Achievements';

function App() {
  useEffect(() => {
    const glow = document.getElementById('global-cursor-glow');
    if (!glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate cursor position ratios relative to viewport dimensions
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      
      // t is close to 0 near top-left (amber glow area) and close to 1 near bottom-right (blue glow area)
      const t = (e.clientX + e.clientY) / (width + height);
      
      // Interpolate between Amber (245, 158, 11) and Blue (59, 130, 246)
      const r = Math.round(245 * (1 - t) + 59 * t);
      const g = Math.round(158 * (1 - t) + 130 * t);
      const b = Math.round(11 * (1 - t) + 246 * t);

      // Direct style updates for high-performance rendering (no React state updates)
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.background = `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.18) 0%, rgba(${r}, ${g}, ${b}, 0.05) 45%, transparent 70%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div id="global-cursor-glow" className="global-cursor-glow" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </>
  );
}

export default App;
