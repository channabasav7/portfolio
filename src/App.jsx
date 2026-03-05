import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';

export default function App() {
  return (
    <>
      <ParticleCanvas />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
