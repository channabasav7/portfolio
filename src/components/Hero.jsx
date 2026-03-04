import { motion } from 'framer-motion';
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
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          Digital Artist & Creative Developer
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
          Channabasava is a visionary digital artist and creative developer who
          thrives at the intersection of code and design.
        </motion.p>

        <motion.a
          href="#contact"
          className={styles.cta}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          CONTACT ME
        </motion.a>
      </div>
    </section>
  );
}
