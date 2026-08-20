import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', name: 'home' },
  { label: 'About', name: 'about' },
  { label: 'Skills', name: 'skills' },
  { label: 'Projects', name: 'projects' },
  { label: 'Contact', name: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Handle background glassy transition on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // 3. Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.name);
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    if (elements.length === 0) return;

    const intersectionRatios = new Map();
    elements.forEach(el => intersectionRatios.set(el.id, 0));

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        intersectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      // Find section with highest intersection ratio
      let maxRatio = 0;
      let highestSection = null;
      sectionIds.forEach(id => {
        const ratio = intersectionRatios.get(id) || 0;
        if (ratio >= maxRatio) {
          maxRatio = ratio;
          highestSection = id;
        }
      });

      // Fallback: if all ratios are 0, choose the one closest to the top of viewport
      if (maxRatio === 0) {
        let closestSection = 'home';
        let minDistance = Infinity;
        sectionIds.forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            const distance = Math.abs(el.getBoundingClientRect().top);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = id;
            }
          }
        });
        highestSection = closestSection;
      }

      if (highestSection) {
        setActiveSection(highestSection);
      }
    }, options);

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 4. Smooth scroll handler with offset for sticky header
  const scrollToSection = (id, e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className={styles.navContainer}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`${styles.nav} ${scrolled || isMobileMenuOpen ? styles.scrolled : ''}`}
        >
          {/* Logo */}
          <div className={styles.left}>
            <a href="#home" onClick={(e) => scrollToSection('home', e)} className={styles.logo}>
              CS<span className={styles.dot}>.</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className={styles.links}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.name}`}
                onClick={(e) => scrollToSection(link.name, e)}
                className={`${styles.link} ${activeSection === link.name ? styles.active : ''}`}
              >
                {activeSection === link.name && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className={styles.activeIndicator}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={styles.linkText}>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className={styles.right}>
            <ThemeToggle />
            
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.mobileToggle}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className={styles.hamburger}>
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.hamburgerLine}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={styles.hamburgerLine}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.hamburgerLine}
                />
              </div>
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.mobileMenuDivider} />
            <nav className={styles.mobileNav}>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${link.name}`}
                    onClick={(e) => scrollToSection(link.name, e)}
                    className={`${styles.mobileNavLink} ${activeSection === link.name ? styles.mobileActive : ''}`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
