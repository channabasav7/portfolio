import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Key,
  Users,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  Activity,
  Eye,
  Download,
  RefreshCw,
  Trash2,
  X,
  Layers,
  Search,
  Settings,
  UserCheck,
  Edit2,
  User
} from 'lucide-react';
import {
  verifyAdminPin,
  updateAdminPin,
  getProcessedAnalytics,
  clearAnalyticsLogs,
  formatDuration,
  exportAnalyticsJSON,
  setVisitorCustomTag
} from '../../services/analyticsService';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [timeFilter, setTimeFilter] = useState('all');
  const [analytics, setAnalytics] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const [newPin, setNewPin] = useState('');
  const [pinSuccess, setPinSuccess] = useState('');

  // Editing Visitor Name/Tag Modal
  const [editingVisitor, setEditingVisitor] = useState(null);
  const [customTagInput, setCustomTagInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      const authSession = sessionStorage.getItem('pf_analytics_auth_session');
      if (authSession === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      loadMetrics();
    }
  }, [isAuthenticated, timeFilter]);

  const loadMetrics = () => {
    const data = getProcessedAnalytics(timeFilter);
    setAnalytics(data);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('pf_analytics_auth_session', 'true');
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('Incorrect Passcode PIN. Try default: 1234');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('pf_analytics_auth_session');
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all visitor analytics history?')) {
      clearAnalyticsLogs();
      loadMetrics();
    }
  };

  const handleUpdatePin = (e) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert('PIN must be at least 4 digits long');
      return;
    }
    if (updateAdminPin(newPin)) {
      setPinSuccess('PIN updated successfully!');
      setNewPin('');
      setTimeout(() => setPinSuccess(''), 3000);
    }
  };

  const handleSaveVisitorTag = (e) => {
    e.preventDefault();
    if (editingVisitor) {
      setVisitorCustomTag(editingVisitor.visitorId, customTagInput);
      setEditingVisitor(null);
      setCustomTagInput('');
      loadMetrics();
    }
  };

  if (!isOpen) return null;

  const filteredLogs = analytics?.logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      (log.visitorName || '').toLowerCase().includes(term) ||
      (log.customTag || '').toLowerCase().includes(term) ||
      (log.visitorEmail || '').toLowerCase().includes(term) ||
      log.id.toLowerCase().includes(term) ||
      log.visitorId.toLowerCase().includes(term) ||
      (log.location?.country || '').toLowerCase().includes(term) ||
      (log.location?.city || '').toLowerCase().includes(term) ||
      log.device.toLowerCase().includes(term) ||
      log.browser.toLowerCase().includes(term)
    );
  }) || [];

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      {!isAuthenticated ? (
        /* PASSCODE PIN AUTH GATE */
        <div className={styles.authContainer}>
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            <X size={20} />
          </button>
          <div className={styles.authIconWrapper}>
            <Lock size={30} />
          </div>
          <span className={styles.labelPrefix}>// PRIVATE ACCESS</span>
          <h2 className={styles.authTitle}>Visitor Analytics</h2>
          <p className={styles.authSubtitle}>
            Enter your passcode PIN to view private portfolio analytics.
            <br />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Default PIN: 1234</span>
          </p>

          <form onSubmit={handleLoginSubmit} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className={styles.pinInput}
                autoFocus
              />
              <Key size={18} style={{ position: 'absolute', right: '1rem', color: 'var(--text-secondary)' }} />
            </div>

            {authError && <div className={styles.errorMessage}>{authError}</div>}

            <button type="submit" className={styles.authSubmitBtn}>
              <Unlock size={16} /> Access Analytics
            </button>
          </form>
        </div>
      ) : (
        /* MAIN AUTHENTICATED DASHBOARD */
        <div className={styles.dashboardWindow}>
          {/* Header */}
          <div className={styles.dashboardHeader}>
            <div className={styles.headerTitleGroup}>
              <div>
                <span className={styles.labelPrefix} style={{ marginBottom: 0 }}>// ADMIN DASHBOARD</span>
                <h2 className={styles.headerTitle}>
                  <Shield size={22} style={{ color: 'var(--accent)' }} /> Portfolio Visitor Insights
                </h2>
              </div>
              <span className={styles.liveBadge}>
                <span className={styles.pulseDot}></span>
                {analytics?.activeNowCount || 0} Online
              </span>
            </div>

            <div className={styles.headerActions}>
              <div className={styles.filterTabs}>
                {['today', '7days', '30days', 'all'].map((f) => (
                  <button
                    key={f}
                    className={`${styles.tabBtn} ${timeFilter === f ? styles.activeTab : ''}`}
                    onClick={() => setTimeFilter(f)}
                  >
                    {f === 'today' ? 'Today' : f === '7days' ? '7 Days' : f === '30days' ? '30 Days' : 'All Time'}
                  </button>
                ))}
              </div>

              <button className={styles.iconBtn} onClick={loadMetrics} title="Refresh Data">
                <RefreshCw size={14} /> Refresh
              </button>

              <button className={styles.iconBtn} onClick={exportAnalyticsJSON} title="Export JSON">
                <Download size={14} /> Export
              </button>

              <button className={styles.iconBtn} onClick={() => setShowSettings(true)} title="Settings">
                <Settings size={14} />
              </button>

              <button className={styles.iconBtn} onClick={handleLogout} title="Lock Dashboard">
                <Lock size={14} /> Lock
              </button>

              <button className={styles.closeBtn} onClick={onClose} style={{ position: 'static' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Dashboard Body */}
          <div className={styles.dashboardBody}>
            {/* Stat Cards Grid */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <Eye size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Total Views</span>
                  <span className={styles.metricValue}>{analytics?.totalPageViews || 0}</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <Users size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Unique Visitors</span>
                  <span className={styles.metricValue}>{analytics?.uniqueVisitors || 0}</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <Clock size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Total Time</span>
                  <span className={styles.metricValue}>{formatDuration(analytics?.totalDurationSeconds)}</span>
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <Activity size={22} />
                </div>
                <div className={styles.metricInfo}>
                  <span className={styles.metricLabel}>Avg Duration</span>
                  <span className={styles.metricValue}>{formatDuration(analytics?.avgDurationSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className={styles.chartsGrid}>
              <div className={styles.cardPanel}>
                <div className={styles.panelTitle}>
                  <div>
                    <span className={styles.labelPrefix}>// TRAFFIC OVERVIEW</span>
                    Visitor Traffic Timeline
                  </div>
                </div>

                <div className={styles.chartContainer}>
                  {analytics?.timelineData && analytics.timelineData.length > 0 ? (
                    (() => {
                      const maxVal = Math.max(...analytics.timelineData.map((d) => d.count), 1);
                      return analytics.timelineData.map((d, i) => {
                        const pct = Math.max((d.count / maxVal) * 100, 8);
                        return (
                          <div key={i} className={styles.barCol}>
                            <div
                              className={styles.barFill}
                              style={{ height: `${pct}%` }}
                              data-value={`${d.count} visits`}
                            ></div>
                            <span className={styles.barLabel}>{d.date.slice(5)}</span>
                          </div>
                        );
                      });
                    })()
                  ) : (
                    <div style={{ color: 'var(--text-muted)', margin: 'auto', fontSize: '0.9rem' }}>No visits recorded yet</div>
                  )}
                </div>
              </div>

              <div className={styles.cardPanel}>
                <div className={styles.panelTitle}>
                  <div>
                    <span className={styles.labelPrefix}>// DEVICES</span>
                    Device Breakdown
                  </div>
                </div>

                <div className={styles.progressList}>
                  {analytics?.deviceMap &&
                    Object.entries(analytics.deviceMap).map(([device, count]) => {
                      const total = analytics.totalPageViews || 1;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={device} className={styles.progressItem}>
                          <div className={styles.progressHeader}>
                            <span className={styles.progressLabel}>
                              {device === 'Mobile' ? <Smartphone size={14} /> : <Monitor size={14} />} {device}
                            </span>
                            <span className={styles.progressVal}>{pct}% ({count})</span>
                          </div>
                          <div className={styles.track}>
                            <div className={styles.fill} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Section Views & Geo Grid */}
            <div className={styles.chartsGrid}>
              <div className={styles.cardPanel}>
                <div className={styles.panelTitle}>
                  <div>
                    <span className={styles.labelPrefix}>// ENGAGEMENT</span>
                    Top Visited Sections
                  </div>
                </div>
                <div className={styles.progressList}>
                  {analytics?.sectionMap &&
                    Object.entries(analytics.sectionMap).map(([section, count]) => {
                      const maxCount = Math.max(...Object.values(analytics.sectionMap), 1);
                      const pct = Math.round((count / maxCount) * 100);
                      return (
                        <div key={section} className={styles.progressItem}>
                          <div className={styles.progressHeader}>
                            <span className={styles.progressLabel} style={{ textTransform: 'capitalize' }}>
                              <Layers size={14} /> {section} Section
                            </span>
                            <span className={styles.progressVal}>{count} views</span>
                          </div>
                          <div className={styles.track}>
                            <div className={styles.fill} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className={styles.cardPanel}>
                <div className={styles.panelTitle}>
                  <div>
                    <span className={styles.labelPrefix}>// GEOGRAPHY</span>
                    Top Visitor Locations
                  </div>
                </div>
                <div className={styles.progressList}>
                  {analytics?.countryMap &&
                    Object.entries(analytics.countryMap).slice(0, 5).map(([country, count]) => {
                      const total = analytics.totalPageViews || 1;
                      const pct = Math.round((count / total) * 100);
                      return (
                        <div key={country} className={styles.progressItem}>
                          <div className={styles.progressHeader}>
                            <span className={styles.progressLabel}>
                              <Globe size={14} /> {country}
                            </span>
                            <span className={styles.progressVal}>{pct}% ({count})</span>
                          </div>
                          <div className={styles.track}>
                            <div className={styles.fill} style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Detailed Log Table with Visitor Names */}
            <div className={styles.cardPanel}>
              <div className={styles.panelTitle}>
                <div>
                  <span className={styles.labelPrefix}>// VISITOR IDENTITIES & LOGS</span>
                  Visitor Activity Log ({filteredLogs.length})
                </div>

                <div className={styles.inputGroup} style={{ width: '240px' }}>
                  <input
                    type="text"
                    placeholder="Search name, country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.pinInput}
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                  />
                  <Search size={14} style={{ position: 'absolute', right: '0.75rem', color: 'var(--text-secondary)' }} />
                </div>
              </div>

              <div className={styles.tableContainer}>
                <table className={styles.logsTable}>
                  <thead>
                    <tr>
                      <th>Visitor Identity</th>
                      <th>Time & Date</th>
                      <th>Location</th>
                      <th>Device & Browser</th>
                      <th>Traffic Source</th>
                      <th>Sections Visited</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => {
                        const displayName = log.visitorName || log.customTag || null;
                        return (
                          <tr key={log.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {displayName ? (
                                  <UserCheck size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                ) : (
                                  <User size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                )}
                                <div>
                                  <div style={{ fontWeight: displayName ? '700' : '500', color: displayName ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                    {displayName || `Visitor #${log.visitorId.slice(0, 10)}`}
                                  </div>
                                  {log.visitorEmail && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{log.visitorEmail}</div>
                                  )}
                                </div>
                                <button
                                  className={styles.iconBtn}
                                  style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', marginLeft: 'auto' }}
                                  title="Add Name / Tag to Visitor"
                                  onClick={() => {
                                    setEditingVisitor(log);
                                    setCustomTagInput(log.visitorName || log.customTag || '');
                                  }}
                                >
                                  <Edit2 size={12} />
                                </button>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: '600' }}>{log.time}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.date}</div>
                            </td>
                            <td>
                              <div>{log.location?.country || 'Unknown'}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.location?.city || ''}</div>
                            </td>
                            <td>
                              <div>{log.device} • {log.os}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.browser}</div>
                            </td>
                            <td>{log.referrer}</td>
                            <td>
                              {(log.sectionsVisited || ['hero']).map((s) => (
                                <span key={s} className={styles.tag}>
                                  {s}
                                </span>
                              ))}
                            </td>
                            <td style={{ fontWeight: '700', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                              {formatDuration(log.duration)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No visitor logs match your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Edit Visitor Tag/Name Modal */}
          {editingVisitor && (
            <div className={styles.settingsModal}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  Name Visitor #{editingVisitor.visitorId.slice(0, 8)}
                </h3>
                <button className={styles.closeBtn} onClick={() => setEditingVisitor(null)} style={{ position: 'static' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveVisitorTag}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Set Name or Note for this Visitor ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex (Google Recruiter)"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  className={styles.pinInput}
                  style={{ fontSize: '0.95rem', marginBottom: '1rem', letterSpacing: 'normal', fontFamily: 'var(--font-body)' }}
                  autoFocus
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button type="button" className={styles.iconBtn} onClick={() => setEditingVisitor(null)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.authSubmitBtn} style={{ padding: '0.5rem 1.25rem' }}>
                    Save Name
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Settings Modal */}
          {showSettings && (
            <div className={styles.settingsModal}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Admin Settings</h3>
                <button className={styles.closeBtn} onClick={() => setShowSettings(false)} style={{ position: 'static' }}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleUpdatePin} style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  Change Passcode PIN
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="password"
                    placeholder="New 4-digit PIN"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className={styles.pinInput}
                    style={{ fontSize: '0.95rem' }}
                  />
                  <button type="submit" className={styles.authSubmitBtn} style={{ padding: '0.5rem 1.25rem' }}>
                    Save
                  </button>
                </div>
                {pinSuccess && <div style={{ color: 'var(--accent)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{pinSuccess}</div>}
              </form>

              <hr style={{ borderColor: 'var(--border)', margin: '1.5rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#ef4444', fontWeight: '600', fontSize: '0.9rem' }}>Clear Analytics Data</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Permanently erase visitor history logs</div>
                </div>
                <button
                  onClick={handleClearLogs}
                  className={styles.iconBtn}
                  style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  <Trash2 size={14} /> Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
