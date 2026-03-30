import { useTheme } from '../hooks/useTheme';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const nextTheme = theme === 'dark'
    ? 'light'
    : theme === 'light'
      ? 'vermilion'
      : theme === 'vermilion'
        ? 'neon'
        : 'dark';

  const themeLabel = theme === 'dark'
    ? 'Dark'
    : theme === 'light'
      ? 'Light'
      : theme === 'vermilion'
        ? 'Vermillion'
        : 'Neon';

  return (
    <button
      className={`${styles.toggle} ${styles[theme]}`}
      onClick={toggleTheme}
      aria-label={`Current theme ${themeLabel}. Switch to ${nextTheme} mode`}
      title={`Current theme ${themeLabel}. Switch to ${nextTheme} mode`}
    >
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : theme === 'vermilion' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C10.6 5.1 9 7 9 10c0 1.8 1.1 3.2 3 4.1-0.6-2.1 0.9-3.5 2.2-5 1.2-1.4 2.3-2.9 1.7-5.1 2.8 2.2 4.1 4.8 4.1 7.7 0 4.8-3.5 8.3-8 8.3s-8-3.3-8-7.9c0-3.4 2-6.1 5.4-8.1-0.4 2 0.2 3.2 1.2 4.2C10.6 7 10.8 4.6 12 2z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="13 2 5 14 12 14 11 22 19 10 12 10 13 2" />
        </svg>
      )}
      <span className={styles.label}>{themeLabel}</span>
    </button>
  );
}
