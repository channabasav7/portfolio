import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

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
                </motion.div>

                <div className={styles.grid}>
                    <div className={styles.info}>
                        <p className={styles.desc}>
                            Have a project in mind? I'd love to hear about it. Drop me a message
                            and I'll get back to you as soon as possible.
                        </p>
                        <div className={styles.contactDetails}>
                            <a href="mailto:channabasav40@gmail.com" className={styles.detailLink}>channabasav40@gmail.com</a>
                        </div>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            className={styles.input} 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            className={styles.input} 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                        <textarea 
                            name="message"
                            placeholder="Message" 
                            className={styles.textarea} 
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
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
