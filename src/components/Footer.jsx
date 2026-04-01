import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/channabasava-s-m-66b140299/', icon: 'in' },
  { name: 'GitHub', href: '#', icon: '⌨' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className={`container ${styles.inner}`}>
        {/* Big CTA */}
        <motion.div
          className={styles.top}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className={styles.label}>// Get in touch</span>
          <h2 className={styles.heading}>
            Let's build something <span className={styles.accent}>amazing</span> together
          </h2>
          <p className={styles.sub}>
            I'm currently open to new freelance projects and collaborations.
          </p>
          <div className={styles.actions}>
            <motion.a
              href="mailto:channabasava@example.com"
              className={styles.ctaPrimary}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Send me an email
            </motion.a>
            <motion.a
              href="#"
              className={styles.ctaSecondary}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Hire on Contra
            </motion.a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <a href="#" className={styles.logo}>
            CS<span className={styles.dot}>.</span>
          </a>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Channabasava. All rights reserved.
          </p>
          <div className={styles.links}>
            {socials.map((s) => (
              <a key={s.name} href={s.href} className={styles.socialLink} title={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
