import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          CS<span className={styles.dot}>.</span>
        </a>

        <div className={styles.right}>
          <div className={styles.badge}>
            <span className={styles.pulse} />
            available for new project
          </div>
          <a href="#contact" className={styles.cta}>
            CONTACT ME
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
