import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import styles from './Resume.module.css';

const resumeHighlights = [
  'Flutter, Dart, and Android development with practical project experience',
  'React, JavaScript, TypeScript, responsive UI design',
  'SQL and Power BI for data handling and reporting',
  'Python automation and practical project delivery',
  'Hack-A-League 4.0 2nd Runner-Up with Team HackOps',
  'Git/GitHub workflow and clean component architecture',
];

export default function Resume() {
  return (
    <section className={styles.section} id="resume">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className={styles.label}>// Profile</span>
          <h2 className={styles.heading}>Resume</h2>
          <p className={styles.subtext}>
            Quick snapshot of my profile. Open the full one-page resume for complete details.
          </p>
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.metaStrip}>
            <span className={styles.metaChip}>Flutter </span>
            <span className={styles.metaChip}>Expected Graduation: 2027</span>
            <span className={styles.metaChip}>Open to Internship</span>
          </div>

          <div className={styles.topRow}>
            <div>
              <h3 className={styles.name}>Channabasava</h3>
              <p className={styles.role}>Aspiring Flutter and Frontend Developer</p>
            </div>
            <FileText size={24} className={styles.icon} />
          </div>

          <p className={styles.summary}>
            Student developer focused on mobile and frontend development, building user-centric
            applications with modern tools and practical project experience.
          </p>

          <ul className={styles.points}>
            {resumeHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              href="/resume-print.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              <FileText size={16} />
              View Full Resume
            </a>
            <a
              href="/Channabasava_SM_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
              download="Channabasava_SM_Resume.pdf"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
