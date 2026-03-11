import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React', icon: '⚛' },
            { name: 'JavaScript', icon: '🟨' },
            { name: 'TypeScript', icon: '🔷' },
            { name: 'HTML/CSS', icon: '🎨' },
            { name: 'Framer Motion', icon: '✨' },
            { name: 'Three.js', icon: '🌐' },
        ]
    },
    {
        title: 'Backend & Tools',
        skills: [
            { name: 'Node.js', icon: '🟩' },
            { name: 'Express', icon: '🚂' },
            { name: 'Git', icon: '📦' },
            { name: 'Vite', icon: '⚡' },
            { name: 'Figma', icon: '🎭' },
        ]
    }
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Skills() {
    return (
        <section className={styles.section} id="skills">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                >
                    <span className={styles.label}>// About me</span>
                    <h2 className={styles.heading}>Skills &amp; Expertise</h2>
                    <p className={styles.sub}>
                        I craft digital experiences with a strong foundation in both design thinking
                        and engineering. Here's what I bring to the table.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {/* Categorized Skills */}
                    <div className={styles.skillsCategories}>
                        {skillCategories.map((category, i) => (
                            <motion.div
                                key={category.title}
                                className={styles.categoryBlock}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-60px' }}
                                custom={i}
                            >
                                <h3 className={styles.categoryTitle}>{category.title}</h3>
                                <div className={styles.badgeWrap}>
                                    {category.skills.map(skill => (
                                        <div key={skill.name} className={styles.skillBadge}>
                                            <span className={styles.badgeIcon}>{skill.icon}</span>
                                            <span className={styles.badgeName}>{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* About card */}
                    <motion.div
                        className={styles.aboutCard}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <div className={styles.avatarBlock}>
                            <div className={styles.avatar}>CS</div>
                            <div>
                                <h3 className={styles.name}>Channabasava</h3>
                                <p className={styles.role}>Creative Developer</p>
                            </div>
                        </div>
                        <p className={styles.bio}>
                            I'm a creative developer passionate about building beautiful,
                            functional digital products. With 3+ years of experience, I blend
                            design craft with clean engineering to create memorable web experiences.
                        </p>
                        <div className={styles.statsRow}>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>3+</span>
                                <span className={styles.statLabel}>Years Exp.</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>20+</span>
                                <span className={styles.statLabel}>Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>15+</span>
                                <span className={styles.statLabel}>Clients</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
