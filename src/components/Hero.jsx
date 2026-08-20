import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import styles from './Hero.module.css';

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function Hero() {
  const name = 'CHANNABASAVA';

  return (
    <section className={styles.hero} id="home">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            ASPIRING WEB & FLUTTER  DEVELOPER
          </motion.p>

          <h1 className={styles.name}>
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                className={char === ' ' ? styles.space : undefined}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            Building functional and
        user-centric applications with a focus on Frontend and flutter
            development.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <a href="#contact" className={styles.cta}>
              Let's Talk →
            </a>
            <a href="https://github.com/channabasav7" className={styles.social} aria-label="Github">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/channabasava-s-m-66b140299/" className={styles.social} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
