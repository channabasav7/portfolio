import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

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
          <button
            type="button"
            className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ''}`}
            onClick={handleToggleMenu}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
            <span className={styles.menuLine} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.mobileLink}
                onClick={handleCloseMenu}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
