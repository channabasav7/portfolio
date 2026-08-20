import { useEffect, useRef } from 'react';
import { trackSessionStart, trackSessionHeartbeat, ensureInitialData } from '../services/analyticsService';

/**
 * Custom hook for silent background visitor tracking
 */
export function useVisitorTracker() {
  const activeSectionRef = useRef('hero');
  const timerRef = useRef(null);

  useEffect(() => {
    // Ensure initial demo logs if completely empty for seamless dashboard testing
    ensureInitialData();

    // Start visitor tracking session
    trackSessionStart();

    // Section visibility observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            activeSectionRef.current = entry.target.id;
            trackSessionHeartbeat(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe portfolio sections if present in DOM
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'resume', 'contact'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Heartbeat every 10 seconds to update active session duration
    timerRef.current = setInterval(() => {
      trackSessionHeartbeat(activeSectionRef.current);
    }, 10000);

    // Visibility & page unload handlers
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackSessionHeartbeat(activeSectionRef.current);
      }
    };

    const handleBeforeUnload = () => {
      trackSessionHeartbeat(activeSectionRef.current);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      sectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export default useVisitorTracker;
