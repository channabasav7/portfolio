import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
];

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

        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.right}>
          <ThemeToggle />
          <div className={styles.badge}>
            <span className={styles.pulse} />
            available for work
          </div>
          <a href="#contact" className={styles.cta}>
            CONTACT ME
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
