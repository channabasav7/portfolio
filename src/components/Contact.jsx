import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { identifyVisitor } from '../services/analyticsService';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        // Automatically link visitor name and email to their tracking session ID
        if (formData.name) {
            identifyVisitor(formData.name, formData.email);
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: '5fbd4904-b38b-4e34-b9cc-2388dc4c8f13',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to: 'channabasav40@gmail.com',
                    subject: 'New Contact Form Submission'
                })
            });

            const result = await response.json();
            
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission failed:', error);
            setStatus('error');
        }
    };

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
                    <p className={styles.headerSubtext}>Open to internship and freelance frontend projects.</p>
                </motion.div>

                <div className={styles.grid}>
                    <aside className={styles.infoCard}>
                        <h3 className={styles.infoTitle}>Start a conversation</h3>
                        <p className={styles.desc}>
                            Have a project in mind? I'd love to hear about it. Drop me a message
                            and I'll get back to you as soon as possible.
                        </p>
                        <div className={styles.contactDetails}>
                            <a href="mailto:channabasav40@gmail.com" className={styles.detailLink}>
                                <span className={styles.detailLabel}>Email</span>
                                <span>channabasav40@gmail.com</span>
                            </a>
                            <a href="tel:+919483992653" className={styles.detailLink}>
                                <span className={styles.detailLabel}>Phone</span>
                                <span>+91 9483992653</span>
                            </a>
                            <a href="https://www.linkedin.com/in/channabasava-s-m-66b140299/" target="_blank" rel="noreferrer" className={styles.detailLink}>
                                <span className={styles.detailLabel}>LinkedIn</span>
                                <span>channabasava-s-m-66b140299</span>
                            </a>
                            <a href="https://github.com/channabasav7" target="_blank" rel="noreferrer" className={styles.detailLink}>
                                <span className={styles.detailLabel}>GitHub</span>
                                <span>github.com/channabasav7</span>
                            </a>
                        </div>
                    </aside>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h3 className={styles.formTitle}>Send a message</h3>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Your Name</span>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Name" 
                                className={styles.input} 
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Email Address</span>
                            <input 
                                type="email" 
                                name="email"
                                placeholder="you@example.com" 
                                className={styles.input} 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Project Details</span>
                            <textarea 
                                name="message"
                                placeholder="Tell me about your idea, timeline, and requirements..." 
                                className={styles.textarea} 
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <button 
                            type="submit" 
                            className={styles.submitBtn}
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && (
                            <p className={styles.successMsg}>Message sent successfully!</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.errorMsg}>Failed to send. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
