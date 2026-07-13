import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
    return (
        <section className={styles.section} id="about">
            <div className="container">
                <motion.div
                    className={styles.inner}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className={styles.label}>// Who I am</span>
                    <h2 className={styles.heading}>About me</h2>
                    <div className={styles.content}>
                        <p className={styles.text}>
                            I'm an aspiring front-end and Flutter developer with a strong focus on building functional and user-centric applications.
                            Currently deepening expertise in Java, mobile app development, and data analytics with SQL, Power BI, and Pandas, alongside modern frameworks like React, TypeScript, Flutter, and Dart.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
