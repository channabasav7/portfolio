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
                            I'm a visionary digital artist and creative developer who thrives at the intersection of code and design.
                            My passion lies in crafting immersive digital experiences and building robust, scalable solutions.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
