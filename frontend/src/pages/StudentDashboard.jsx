import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';
import MagneticButton from '../components/motion/MagneticButton';
import { Link } from 'react-router-dom';
import { ArrowRight, LogOut } from 'lucide-react';
import apiClient from '../api/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!user?.id) return;
        
        const res = await apiClient.get(`/checkins/me`);
        const formattedData = res.data.map(item => ({
          name: new Date(item.created_at).toLocaleDateString(),
          mood: item.mood,
          stress: item.stress,
          sleep: item.sleep
        }));
        setHistory(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) return null;

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
        
        {/* Header bar for logout */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
          <span>Hi, {user?.first_name}</span>
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} title="Sign Out">
            <LogOut size={20} />
          </button>
        </div>

        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '4rem' }}>
            <h1 className="editorial" style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              How are you feeling?
            </h1>
          </header>

          {history.length === 0 ? (
            <div className="neomorphic-inset" style={{ padding: '4rem 2rem', textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Your first check-in is waiting.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                A quick weekly check-in helps you understand how things are changing over time.
              </p>
              <Link to="/student/check-in">
                <MagneticButton 
                  className="neomorphic"
                  style={{
                    padding: '1rem 2rem',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Start check-in <ArrowRight size={18} />
                </MagneticButton>
              </Link>
            </div>
          ) : (
            <div>
              <div className="neomorphic" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Your Trend
                </h3>
                
                <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
                  <ResponsiveContainer>
                    <LineChart data={history} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <Line type="monotone" dataKey="mood" stroke="#8884d8" name="Mood" strokeWidth={2} />
                      <Line type="monotone" dataKey="stress" stroke="#82ca9d" name="Stress" strokeWidth={2} />
                      <Line type="monotone" dataKey="sleep" stroke="#ffc658" name="Sleep" strokeWidth={2} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" opacity={0.5} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>
                  As you check in over time, MindTrack will help you understand how things are changing.
                </p>

                <div style={{ marginTop: '3rem' }}>
                  <Link to="/student/check-in">
                    <MagneticButton 
                      className="neomorphic"
                      style={{
                        padding: '1rem 2rem',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--text-primary)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      New Check-in
                    </MagneticButton>
                  </Link>
                  <Link to="/student/resources" style={{ marginLeft: '1rem' }}>
                    <MagneticButton 
                      className="neomorphic"
                      style={{
                        padding: '1rem 2rem',
                        background: 'transparent',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--text-primary)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      Resource Hub
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
