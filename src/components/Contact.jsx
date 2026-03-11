import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section className={styles.section} id="contact">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className={styles.label}>// Get in touch</span>
                    <h2 className={styles.heading}>Let's work together</h2>
                </motion.div>

                <div className={styles.grid}>
                    <div className={styles.info}>
                        <p className={styles.desc}>
                            Have a project in mind? We'd love to hear about it. Drop us a message
                            and we'll get back to you as soon as possible.
                        </p>
                        <div className={styles.contactDetails}>
                            <a href="mailto:hello@example.com" className={styles.detailLink}>hello@example.com</a>
                        </div>
                    </div>
                    <form className={styles.form}>
                        <input type="text" placeholder="Name" className={styles.input} />
                        <input type="email" placeholder="Email" className={styles.input} />
                        <textarea placeholder="Message" className={styles.textarea} rows={5}></textarea>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
