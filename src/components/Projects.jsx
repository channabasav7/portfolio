import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  {
    name: 'rxassist',
    category: 'Python / MedicalTech',
    desc: 'A Python-based application for medical diagnosis and prescriptions with a dedicated frontend interface.',
    color: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    accentColor: '#4fabff',
    year: '2024',
  },
  {
    name: 'HTML Portfolio',
    category: 'Web Development',
    desc: 'Foundational web project showcasing early skills in frontend development, structure, and semantic HTML.',
    color: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accentColor: '#38ef7d',
    year: '2024',
  },
  {
    name: 'Resume Capstone',
    category: 'Professional Tool',
    desc: 'A structured project demonstrating professional credential organization into a clean web format.',
    color: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    accentColor: '#ff7b7b',
    year: '2024',
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

        <div className={styles.grid}>
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
                <a href="#" className={styles.link}>
                  View project →
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
          <a href="#" className={styles.viewAllLink}>
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
