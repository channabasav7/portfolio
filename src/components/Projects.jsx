import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
  {
    name: 'Food App',
    category: 'Flutter / Dart',
    desc: 'A Flutter-based food delivery application with a clean UI and smooth user experience.',
    color: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
    accentColor: '#ffb347',
    year: '2026',
    github: 'https://github.com/channabasav7/Food',
    language: 'Dart',
  },
  {
    name: 'Hand Gesture',
    category: 'Python / Computer Vision',
    desc: 'Hand gesture recognition system using Python and computer vision techniques.',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#a78bfa',
    year: '2026',
    github: 'https://github.com/channabasav7/Hand-gesture',
    language: 'Python',
  },
  {
    name: 'Nike Store',
    category: 'HTML / CSS / JavaScript',
    desc: 'A modern Nike store frontend with responsive design and interactive UI elements.',
    color: 'linear-gradient(135deg, #1a1a1a 0%, #434343 100%)',
    accentColor: '#ff4545',
    year: '2026',
    github: 'https://github.com/channabasav7/Nike_Store',
    language: 'HTML',
  },
  {
    name: 'Sunny Days Ahead',
    category: 'TypeScript / Web App',
    desc: 'A weather application built with TypeScript for forecasting and weather data visualization.',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#fbbf24',
    year: '2026',
    github: 'https://github.com/channabasav7/sunny-days-ahead',
    language: 'TypeScript',
  },
  {
    name: 'System Controller',
    category: 'Python / Automation',
    desc: 'Python-based system control and automation tool for desktop operations.',
    color: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    accentColor: '#60a5fa',
    year: '2026',
    github: 'https://github.com/channabasav7/system-controller-',
    language: 'Python',
  },
  {
    name: 'AI Voice Assistant',
    category: 'AI / Voice Recognition',
    desc: 'An AI-powered voice assistant application for hands-free interaction and automation.',
    color: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
    accentColor: '#22d3ee',
    year: '2026',
    github: 'https://github.com/channabasav7/AI-voice-Assistant',
    language: 'AI',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function Projects() {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const scrollCards = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * 360,
      behavior: 'smooth',
    });
  };

  const handlePointerDown = (event) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.classList.add(styles.dragging);
    scrollRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!scrollRef.current || !isDraggingRef.current) return;
    const distance = event.clientX - dragStartXRef.current;
    scrollRef.current.scrollLeft = dragStartScrollRef.current - distance;
  };

  const handlePointerUp = (event) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = false;
    scrollRef.current.classList.remove(styles.dragging);
    if (scrollRef.current.hasPointerCapture(event.pointerId)) {
      scrollRef.current.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className={styles.label}>// My work</span>
          <h2 className={styles.heading}>Featured projects</h2>
        </motion.div>

        <div className={styles.scrollControls}>
          <span className={styles.scrollHint}>Drag or use arrows</span>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.scrollButton}
              onClick={() => scrollCards(-1)}
              aria-label="Scroll projects left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className={styles.scrollButton}
              onClick={() => scrollCards(1)}
              aria-label="Scroll projects right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={styles.grid}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              className={styles.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.thumb} style={{ background: project.color }}>
                <span
                  className={styles.thumbInitial}
                  style={{ color: project.accentColor }}
                >
                  {project.name[0]}
                </span>
                <div
                  className={styles.thumbGlow}
                  style={{ background: project.accentColor }}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.tag}># {project.category}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <h3 className={styles.name}>{project.name}</h3>
                <p className={styles.desc}>{project.desc}</p>
                <a href={project.github} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <Github size={16} />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="https://github.com/channabasav7" className={styles.viewAllLink} target="_blank" rel="noopener noreferrer">
            VIEW ALL PROJECTS
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
