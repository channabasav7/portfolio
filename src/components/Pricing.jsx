import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Fast',
    price: '2499',
    popular: false,
    features: [
      'One request at a time',
      '72 hours delivery',
      'Unlimited revisions',
      'Pause or cancel anytime',
    ],
  },
  {
    name: 'Super Fast',
    price: '3499',
    popular: true,
    features: [
      'Two requests at a time',
      '48 hours delivery',
      'Unlimited revisions',
      'Pause or cancel anytime',
    ],
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

export default function Pricing() {
  return (
    <section className={styles.section} id="pricing">
      <div className="container">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          Pricing
        </motion.h2>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.planRow}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  {plan.popular && (
                    <span className={styles.badge}>Popular</span>
                  )}
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.dollar}>$</span>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>/month</span>
                </div>
              </div>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                className={`${styles.cta} ${plan.popular ? styles.ctaPopular : ''}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                START TODAY
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.spots}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          2 spots available
        </motion.p>
      </div>
    </section>
  );
}
