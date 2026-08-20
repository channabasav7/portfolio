import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const loadingWords = ["Developing", "Designing", "Optimizing", "Deploying"];

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId;
    let wordIntervalId;

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      // Duration is 1000ms (1 second) to feel fast yet visible
      const ratio = Math.min(elapsed / 1000, 1);
      setProgress(ratio * 100);

      if (ratio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    wordIntervalId = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % loadingWords.length);
    }, 250); // Shift keywords slightly faster to match 1s duration

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(wordIntervalId);
    };
  }, [onComplete]);

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Background grid lines */}
      <div className={styles.gridBg} />

      {/* Top Header */}
      <div className={styles.top}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={styles.title}
          >
            Channabasava
          </motion.h1>
        </div>
        <div className={styles.rightHeader}>
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className={styles.subtitle}
          >
            Portfolio {new Date().getFullYear()}
          </motion.span>
        </div>
      </div>

      {/* Middle Counter */}
      <div className={styles.middle}>
        <div style={{ position: 'relative' }}>
          <motion.span
            className={styles.percent}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {Math.floor(progress)}%
          </motion.span>
        </div>
        <div className={styles.wordContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.word}
            >
              {loadingWords[activeWordIndex]}...
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className={styles.bottom}>
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            style={{ scaleX: progress / 100 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <div className={styles.statusRow}>
          <span>Loading Assets</span>
          <span>Ready</span>
        </div>
      </div>
    </motion.div>
  );
}
