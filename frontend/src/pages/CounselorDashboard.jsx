import React, { useState, useEffect } from 'react';
import { Users, AlertCircle, Activity, Bell, LogOut, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';

export default function CounselorDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    students_monitored: 0,
    active_alerts: 0,
    checkins_this_week: 0
  });
  const [riskEvents, setRiskEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock stats for now, actual implementation would need a stats endpoint
      setStats({
        students_monitored: 120,
        active_alerts: 0,
        checkins_this_week: 45
      });
      
      const riskRes = await apiClient.get('/counselor-ops/risk-events');
      setRiskEvents(riskRes.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await apiClient.post(`/counselor-ops/risk-events/${id}/resolve`);
      fetchDashboardData(); // Refresh list
    } catch (err) {
      console.error("Failed to resolve risk event", err);
    }
  };

  if (loading) {
    return <div style={styles.layout}>Loading dashboard...</div>;
  }

  return (
    <PageTransition>
      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.logo}>MINDTRACK</div>
          <nav style={styles.nav}>
            <a href="#" style={styles.navItemActive}><Activity size={18}/> Dashboard</a>
            <a href="#" style={styles.navItem}><Users size={18}/> Students</a>
            <a href="#" style={styles.navItem}><Bell size={18}/> Interventions</a>
          </nav>
          <div style={{marginTop: 'auto'}}>
            <button onClick={logout} style={styles.logoutBtn}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={styles.main}>
          <header style={styles.header}>
            <h1 className="editorial" style={styles.h1}>Good morning, {user?.first_name || 'Counselor'}.</h1>
            <p style={styles.subtitle}>Here is your priority queue.</p>
          </header>

          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div className="neomorphic" style={styles.statCard}>
              <div style={styles.statLabel}>Students Monitored</div>
              <div style={styles.statValue}>{stats.students_monitored}</div>
            </div>
            <div className="neomorphic" style={styles.statCard}>
              <div style={styles.statLabel}>Active Risk Events</div>
              <div style={styles.statValue}>{riskEvents.length}</div>
            </div>
            <div className="neomorphic" style={styles.statCard}>
              <div style={styles.statLabel}>Check-ins this week</div>
              <div style={styles.statValue}>{stats.checkins_this_week}</div>
            </div>
          </div>

          {/* Alerts Section */}
          <section style={styles.alertsSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.h2}>Priority Queue</h2>
              {riskEvents.length > 0 && <span style={styles.badge}>{riskEvents.length} Requires Action</span>}
            </div>
            
            <div style={styles.alertsList}>
              {riskEvents.length === 0 ? (
                <div className="neomorphic-inset" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>You're all caught up.</p>
                  <p style={{ color: 'var(--text-secondary)' }}>There are no active risk events right now.</p>
                </div>
              ) : (
                riskEvents.map(event => (
                  <div key={event.id} className="neomorphic" style={styles.alertItem}>
                    <div style={styles.alertIcon}>
                      <AlertCircle color={'#e74c3c'} size={24} />
                    </div>
                    <div style={styles.alertContent}>
                      <h3 style={styles.alertName}>Student ID: {event.student_id}</h3>
                      <p style={styles.alertReason}>{event.description}</p>
                    </div>
                    <div style={styles.alertMeta}>
                      <span style={styles.alertDate}>{new Date(event.created_at).toLocaleString()}</span>
                      <button onClick={() => handleResolve(event.id)} style={styles.btnAction}>
                        <CheckCircle size={16} /> Resolve
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
}

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)'
  },
  sidebar: {
    width: '260px',
    borderRight: '1px solid rgba(0,0,0,0.05)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    fontWeight: 700,
    letterSpacing: '0.1em',
    marginBottom: '3rem'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s'
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    fontWeight: 500,
    textDecoration: 'none'
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0'
  },
  main: {
    flex: 1,
    padding: '3rem 4rem',
    maxWidth: '1200px'
  },
  header: {
    marginBottom: '3rem'
  },
  h1: {
    fontSize: '2.5rem',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    marginBottom: '4rem'
  },
  statCard: {
    padding: '2rem'
  },
  statLabel: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: '0.5rem'
  },
  statValue: {
    fontSize: '3rem',
    fontWeight: 500,
    lineHeight: 1
  },
  alertsSection: {
    
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  badge: {
    backgroundColor: '#e74c3c22',
    color: '#e74c3c',
    padding: '0.2rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600
  },
  alertsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  alertItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    gap: '1.5rem'
  },
  alertIcon: {
    padding: '1rem',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '50%'
  },
  alertContent: {
    flex: 1
  },
  alertName: {
    fontWeight: 600,
    fontSize: '1.1rem',
    marginBottom: '0.2rem'
  },
  alertReason: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  alertMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.8rem'
  },
  alertDate: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)'
  },
  btnAction: {
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }
};
