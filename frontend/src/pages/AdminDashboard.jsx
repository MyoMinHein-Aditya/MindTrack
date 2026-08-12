import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/analytics/school', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return null;

  const isSetupIncomplete = !data || data.setup_progress.students === 0;

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          
          <header style={{ marginBottom: '4rem' }}>
            <h1 className="editorial" style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Good morning, {user.first_name}.
            </h1>
            <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
              Your school workspace is ready.
            </h2>
          </header>

          {isSetupIncomplete ? (
            <div className="neomorphic-inset" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No data yet.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                Once students begin checking in, school-level insights will appear here.
              </p>
              
              <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto', background: 'var(--bg-primary)', padding: '2rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Setup Progress</h4>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>School</span>
                  <span style={{ color: 'var(--accent-primary)' }}>✓</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Counselors</span>
                  <span>{data?.setup_progress.counselors || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span>Teachers</span>
                  <span>{data?.setup_progress.teachers || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Students</span>
                  <span>{data?.setup_progress.students || 0}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              <div className="neomorphic" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Participation</h3>
                <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {data.participation.rate}%
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  {data.participation.participating_students} / {data.participation.total_students} students
                </div>
              </div>

              <div className="neomorphic" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Avg Indicator</h3>
                <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {data.average_wellbeing_score || '--'}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  School-wide baseline
                </div>
              </div>

              <div className="neomorphic" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Interventions</h3>
                <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {data.interventions_completed}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  Successfully completed
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;
