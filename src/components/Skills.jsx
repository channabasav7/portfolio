import { motion } from 'framer-motion';
import styles from './Skills.module.css';

const skills = [
    { name: 'React', level: 90, icon: '⚛' },
    { name: 'JavaScript', level: 88, icon: '🟨' },
    { name: 'TypeScript', level: 78, icon: '🔷' },
    { name: 'Node.js', level: 75, icon: '🟩' },
    { name: 'UI/UX Design', level: 85, icon: '🎨' },
    { name: 'Figma', level: 80, icon: '🎭' },
    { name: 'CSS / Animations', level: 92, icon: '✨' },
    { name: 'Three.js', level: 65, icon: '🌐' },
];

const tools = [
    'VS Code', 'Git', 'Figma', 'Vite', 'Webpack', 'Docker', 'Vercel', 'Notion'
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
                    {/* Skills bars */}
                    <motion.div
                        className={styles.skillsList}
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {skills.map((skill) => (
                            <motion.div key={skill.name} className={styles.skillItem} variants={itemVariants}>
                                <div className={styles.skillMeta}>
                                    <span className={styles.skillIcon}>{skill.icon}</span>
                                    <span className={styles.skillName}>{skill.name}</span>
                                    <span className={styles.skillLevel}>{skill.level}%</span>
                                </div>
                                <div className={styles.barBg}>
                                    <motion.div
                                        className={styles.barFill}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

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
                        <div className={styles.toolsWrap}>
                            <p className={styles.toolsLabel}>Tools I use</p>
                            <div className={styles.tools}>
                                {tools.map((t) => (
                                    <span key={t} className={styles.tool}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
