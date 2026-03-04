import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Hyperspeed from './components/Hyperspeed';
import { hyperspeedPresets } from './components/HyperSpeedPresets';

export default function App() {
  return (
    <>
      <Hyperspeed effectOptions={hyperspeedPresets.one} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Projects />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
