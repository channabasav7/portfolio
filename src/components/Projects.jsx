import { motion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
  { name: 'Archizen', category: 'UI/UX', color: '#1a1a2e' },
  { name: 'Campus', category: 'UI/UX', color: '#1a2e1a' },
  { name: 'Mate', category: 'Branding', color: '#2e1a1a' },
  { name: 'Amore', category: 'Apps', color: '#1a2e2e' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className="container">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Featured projects
        </motion.h2>

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
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={styles.thumb}
                style={{ background: project.color }}
              >
                <span className={styles.thumbText}>{project.name[0]}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{project.name}</h3>
                <span className={styles.tag}>// {project.category}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a href="#" className={styles.viewAllLink}>
            VIEW ALL
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
