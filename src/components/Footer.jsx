import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.top}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2 className={styles.heading}>
            Let's work <span className={styles.accent}>together</span>
          </h2>
          <motion.a
            href="mailto:hello@kaivoid.com"
            className={styles.cta}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            HIRE ON CONTRA
          </motion.a>
        </motion.div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Kai Void. All rights reserved.
          </p>
          <div className={styles.links}>
            <a href="#">Twitter</a>
            <a href="#">Dribbble</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
