import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import useVisitorTracker from './hooks/useVisitorTracker';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize silent background visitor tracking
  useVisitorTracker();

  // Listen for secret keyboard shortcut (Ctrl+Shift+A) or URL hash (#admin)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Secret key combination: Ctrl + Shift + A or Ctrl + Alt + A
      if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#analytics') {
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', checkHash);
    checkHash(); // Check on initial page load

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  return (
    <>
      <ParticleCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
      </div>

      {/* Secret Password-Protected Admin Dashboard */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </>
  );
}
