import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [activeSection, setActiveSection] = useState('#');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const sections = navLinks
      .map((link) => link.href.replace('#', ''))
      .filter((id) => id);

    const updateNavState = () => {
      setIsScrolled(window.scrollY > 24);

      let current = '#';
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (!section) {
          continue;
        }

        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          current = `#${sectionId}`;
          break;
        }
      }

      setActiveSection(current);
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateNavState);
    };
  }, []);

  const navVariants = {
    hidden: { y: -90, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
  };

  return (
    <motion.nav
      className={`${styles.nav} ${isScrolled ? styles.navScrolled : ''}`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`container ${styles.inner}`}>
        <motion.a href="#" className={styles.logo} variants={itemVariants} whileHover={{ y: -1 }}>
          CS<span className={styles.dot}>.</span>
        </motion.a>

        <motion.div className={styles.links} variants={itemVariants}>
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`${styles.link} ${activeSection === link.href ? styles.linkActive : ''}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        <motion.div className={styles.right} variants={itemVariants}>
          <ThemeToggle />
        </motion.div>
      </div>
    </motion.nav>
  );
}
