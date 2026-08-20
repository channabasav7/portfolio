/**
 * Visitor Analytics & Security Service
 * Silent tracking system for portfolio visits, duration, and metrics.
 * Supports visitor identity resolution (linking contact form names & admin custom tags).
 */

const STORAGE_KEY_LOGS = 'pf_analytics_visitor_logs_v1';
const STORAGE_KEY_VISITOR_ID = 'pf_analytics_vid_v1';
const STORAGE_KEY_PIN = 'pf_analytics_admin_pin_v1';
const STORAGE_KEY_VISITOR_NAMES = 'pf_analytics_vnames_v1';
const DEFAULT_PIN = '1234';

// Helper to generate a unique random ID
function generateUuid() {
  return 'v_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

// Get persistent visitor ID
export function getVisitorId() {
  let vid = localStorage.getItem(STORAGE_KEY_VISITOR_ID);
  if (!vid) {
    vid = generateUuid();
    localStorage.setItem(STORAGE_KEY_VISITOR_ID, vid);
  }
  return vid;
}

// Get stored visitor names/tags map
export function getVisitorNamesMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VISITOR_NAMES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Save visitor names map
function saveVisitorNamesMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY_VISITOR_NAMES, JSON.stringify(map));
  } catch (e) {
    console.error('Failed to save visitor name map:', e);
  }
}

/**
 * Identify visitor by Name and Email (e.g. when submitting Contact form)
 */
export function identifyVisitor(name, email = '', targetVid = null) {
  if (!name) return;
  const vid = targetVid || getVisitorId();
  const map = getVisitorNamesMap();

  map[vid] = {
    name: name.trim(),
    email: email.trim(),
    identifiedAt: new Date().toISOString(),
    customTag: map[vid]?.customTag || ''
  };

  saveVisitorNamesMap(map);

  // Also update existing logs in memory/storage
  const logs = getRawLogs();
  let updated = false;
  logs.forEach(log => {
    if (log.visitorId === vid) {
      log.visitorName = name.trim();
      log.visitorEmail = email.trim();
      updated = true;
    }
  });
  if (updated) saveRawLogs(logs);
}

/**
 * Admin manual tagging for a visitor ID (e.g., "Google Recruiter", "Friend")
 */
export function setVisitorCustomTag(visitorId, tag) {
  if (!visitorId) return;
  const map = getVisitorNamesMap();

  map[visitorId] = {
    ...(map[visitorId] || {}),
    customTag: tag.trim()
  };

  saveVisitorNamesMap(map);
}

// Device & OS Parser
export function parseUserAgent() {
  const ua = navigator.userAgent || '';
  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/ipad|tablet/i.test(ua)) device = 'Tablet';

  let os = 'Unknown OS';
  if (/win/i.test(ua)) os = 'Windows';
  else if (/mac/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';

  return { device, os, browser };
}

// Referrer parser
export function getReferrerDomain() {
  const ref = document.referrer;
  if (!ref) return 'Direct / None';
  try {
    const url = new URL(ref);
    if (url.hostname.includes(window.location.hostname)) return 'Internal';
    return url.hostname.replace('www.', '');
  } catch {
    return 'External';
  }
}

// Fetch Geo Location safely without blocking app
async function fetchGeoLocation() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      return {
        city: data.city || 'Unknown',
        region: data.region || '',
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || '',
        org: data.org || '',
        ip: data.ip || 'Hidden'
      };
    }
  } catch {
    // Fallback if blocked
  }
  return {
    city: 'Local/Unknown',
    region: '',
    country: 'Unknown',
    countryCode: 'UN',
    org: '',
    ip: 'Hidden'
  };
}

// Get stored logs
export function getRawLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse analytics logs:', e);
    return [];
  }
}

// Save raw logs
function saveRawLogs(logs) {
  try {
    const trimmed = logs.slice(0, 1000);
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save analytics logs:', e);
  }
}

// State tracking for current active session
let currentSessionId = null;
let sessionStartTime = null;

/**
 * Initialize visitor tracking on app load
 */
export async function trackSessionStart() {
  const visitorId = getVisitorId();
  const namesMap = getVisitorNamesMap();
  const identifiedInfo = namesMap[visitorId] || {};

  const sessionKey = 'pf_current_session_id';
  let sessionId = sessionStorage.getItem(sessionKey);
  const now = new Date();

  const logs = getRawLogs();

  if (!sessionId) {
    sessionId = generateUuid();
    sessionStorage.setItem(sessionKey, sessionId);
    currentSessionId = sessionId;
    sessionStartTime = Date.now();

    const { device, os, browser } = parseUserAgent();
    const referrer = getReferrerDomain();
    const location = await fetchGeoLocation();

    const newLog = {
      id: sessionId,
      visitorId,
      visitorName: identifiedInfo.name || '',
      visitorEmail: identifiedInfo.email || '',
      customTag: identifiedInfo.customTag || '',
      startTime: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastActive: now.toISOString(),
      duration: 0,
      device,
      os,
      browser,
      referrer,
      location,
      sectionsVisited: ['hero'],
      screenSize: `${window.innerWidth}x${window.innerHeight}`
    };

    logs.unshift(newLog);
    saveRawLogs(logs);
  } else {
    currentSessionId = sessionId;
    sessionStartTime = Date.now();
    const existingIndex = logs.findIndex(l => l.id === sessionId);
    if (existingIndex !== -1) {
      logs[existingIndex].lastActive = now.toISOString();
      if (identifiedInfo.name) logs[existingIndex].visitorName = identifiedInfo.name;
      if (identifiedInfo.email) logs[existingIndex].visitorEmail = identifiedInfo.email;
      saveRawLogs(logs);
    }
  }

  return sessionId;
}

/**
 * Update session duration and active section
 */
export function trackSessionHeartbeat(activeSection = null) {
  if (!currentSessionId) return;

  const logs = getRawLogs();
  const index = logs.findIndex(l => l.id === currentSessionId);
  if (index === -1) return;

  const log = logs[index];
  const now = new Date();

  const startMs = new Date(log.startTime).getTime();
  log.duration = Math.max(0, Math.floor((now.getTime() - startMs) / 1000));
  log.lastActive = now.toISOString();

  if (activeSection && !log.sectionsVisited.includes(activeSection)) {
    log.sectionsVisited.push(activeSection);
  }

  saveRawLogs(logs);
}

/**
 * Admin Passcode Authentication
 */
export function getAdminPin() {
  return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
}

export function verifyAdminPin(enteredPin) {
  const currentPin = getAdminPin();
  return String(enteredPin).trim() === String(currentPin).trim();
}

export function updateAdminPin(newPin) {
  if (!newPin || newPin.length < 4) return false;
  localStorage.setItem(STORAGE_KEY_PIN, String(newPin).trim());
  return true;
}

/**
 * Aggregate Analytics Metrics for Admin Dashboard
 */
export function getProcessedAnalytics(timeFilter = 'all') {
  const logs = getRawLogs();
  const namesMap = getVisitorNamesMap();

  const now = new Date();
  let filteredLogs = logs;

  if (timeFilter === 'today') {
    const todayStr = now.toISOString().split('T')[0];
    filteredLogs = logs.filter(l => l.date === todayStr);
  } else if (timeFilter === '7days') {
    const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
    filteredLogs = logs.filter(l => new Date(l.startTime) >= sevenDaysAgo);
  } else if (timeFilter === '30days') {
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    filteredLogs = logs.filter(l => new Date(l.startTime) >= thirtyDaysAgo);
  }

  // Attach up-to-date name/tag maps to each log entry
  const enrichedLogs = filteredLogs.map(l => {
    const info = namesMap[l.visitorId] || {};
    return {
      ...l,
      visitorName: info.name || l.visitorName || '',
      visitorEmail: info.email || l.visitorEmail || '',
      customTag: info.customTag || l.customTag || ''
    };
  });

  const totalPageViews = enrichedLogs.length;
  const uniqueVisitors = new Set(enrichedLogs.map(l => l.visitorId)).size;
  const totalDurationSeconds = enrichedLogs.reduce((acc, l) => acc + (l.duration || 0), 0);
  const avgDurationSeconds = totalPageViews > 0 ? Math.round(totalDurationSeconds / totalPageViews) : 0;

  const activeNowCount = logs.filter(l => {
    const lastActiveMs = new Date(l.lastActive || l.startTime).getTime();
    return Date.now() - lastActiveMs < 60000;
  }).length;

  const dateMap = {};
  enrichedLogs.forEach(l => {
    const d = l.date || 'Unknown';
    dateMap[d] = (dateMap[d] || 0) + 1;
  });

  const timelineData = Object.keys(dateMap)
    .sort()
    .slice(-14)
    .map(date => ({ date, count: dateMap[date] }));

  const deviceMap = { Desktop: 0, Mobile: 0, Tablet: 0 };
  enrichedLogs.forEach(l => {
    const d = l.device || 'Desktop';
    deviceMap[d] = (deviceMap[d] || 0) + 1;
  });

  const browserMap = {};
  enrichedLogs.forEach(l => {
    const b = l.browser || 'Other';
    browserMap[b] = (browserMap[b] || 0) + 1;
  });

  const countryMap = {};
  enrichedLogs.forEach(l => {
    const country = l.location?.country || 'Unknown';
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const sectionMap = {};
  enrichedLogs.forEach(l => {
    (l.sectionsVisited || ['hero']).forEach(sec => {
      sectionMap[sec] = (sectionMap[sec] || 0) + 1;
    });
  });

  const referrerMap = {};
  enrichedLogs.forEach(l => {
    const ref = l.referrer || 'Direct';
    referrerMap[ref] = (referrerMap[ref] || 0) + 1;
  });

  return {
    totalPageViews,
    uniqueVisitors,
    totalDurationSeconds,
    avgDurationSeconds,
    activeNowCount,
    timelineData,
    deviceMap,
    browserMap,
    countryMap,
    sectionMap,
    referrerMap,
    logs: enrichedLogs
  };
}

/**
 * Reset all tracking logs
 */
export function clearAnalyticsLogs() {
  localStorage.removeItem(STORAGE_KEY_LOGS);
}

/**
 * Format duration helper
 */
export function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return '0s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

/**
 * Export data to JSON file
 */
export function exportAnalyticsJSON() {
  const logs = getRawLogs();
  const names = getVisitorNamesMap();
  const payload = { logs, visitorIdentityMap: names };
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `portfolio_analytics_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function ensureInitialData() {
  // Mock data disabled - only real visitor data is tracked
}
