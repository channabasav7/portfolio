import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: '01',
    quote:
      'Void made our website launch seamless. The templates are beautifully designed, easy to customize!',
    name: 'Emma Collins',
    role: 'Marketing Director at Stellar Brands',
  },
  {
    id: '02',
    quote:
      'Using Void was a game-changer! The sleek, modern templates helped us create a high-converting site in no time.',
    name: 'Ryan Thompson',
    role: 'Founder of Elevate Studio',
  },
  {
    id: '03',
    quote:
      'Absolutely love Void! The templates are intuitive, stylish, and perfect for scaling our e-commerce brand effortlessly.',
    name: 'Sophia Martinez',
    role: 'CEO of Lume Essentials',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Happy clients
        </motion.h2>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={styles.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <span className={styles.number}>// {t.id}</span>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div>
                  <h4 className={styles.name}>{t.name}</h4>
                  <p className={styles.role}>// {t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
