import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/admin/dashboard-data', {
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

  const isSetupIncomplete = !data || data.stats.total_students === 0;

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          <header style={{ marginBottom: '2rem' }}>
            <h1 className="editorial" style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Good morning, {user.first_name}.
            </h1>
            <h2 style={{ fontSize: '2rem', letterSpacing: '-0.02em' }}>
              Your detailed school workspace.
            </h2>
          </header>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem' }}>
            <button 
              onClick={() => setActiveTab('overview')} 
              style={{ padding: '0.5rem 1rem', background: activeTab === 'overview' ? 'var(--bg-secondary)' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'overview' ? 'bold' : 'normal' }}>
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('students')} 
              style={{ padding: '0.5rem 1rem', background: activeTab === 'students' ? 'var(--bg-secondary)' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'students' ? 'bold' : 'normal' }}>
              Students Data
            </button>
            <button 
              onClick={() => setActiveTab('counselors')} 
              style={{ padding: '0.5rem 1rem', background: activeTab === 'counselors' ? 'var(--bg-secondary)' : 'transparent', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: activeTab === 'counselors' ? 'bold' : 'normal' }}>
              Counselors
            </button>
          </div>

          {isSetupIncomplete ? (
            <div className="neomorphic-inset" style={{ padding: '3rem', textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No data yet.</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                Once students begin checking in, insights will appear here.
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                  <div className="neomorphic" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Total Students</h3>
                    <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {data.stats.total_students}
                    </div>
                  </div>
                  <div className="neomorphic" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Total Counselors</h3>
                    <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {data.stats.total_counselors}
                    </div>
                  </div>
                  <div className="neomorphic" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase' }}>Online Counselors</h3>
                    <div style={{ fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {data.stats.online_counselors}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="neomorphic" style={{ padding: '2rem', overflowX: 'auto' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Bulk Student Data</h3>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                        <th style={{ padding: '1rem 0' }}>Name</th>
                        <th>Student Email</th>
                        <th>Parent Email</th>
                        <th>Assigned Counselor</th>
                        <th>Risk Level</th>
                        <th>Latest Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.students.map(student => (
                        <tr key={student.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <td style={{ padding: '1rem 0' }}>{student.name}</td>
                          <td>{student.email}</td>
                          <td>{student.parent_email || 'N/A'}</td>
                          <td>{student.assigned_counselor}</td>
                          <td>
                            <span style={{ 
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '4px', 
                              background: student.risk_level === 3 ? 'var(--accent-primary)' : student.risk_level === 2 ? '#f59e0b' : 'rgba(0,0,0,0.05)',
                              color: student.risk_level >= 2 ? 'white' : 'inherit',
                              fontSize: '0.85rem'
                            }}>
                              Level {student.risk_level} ({student.risk_category})
                            </span>
                          </td>
                          <td>{student.latest_score || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'counselors' && (
                <div className="neomorphic" style={{ padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Active Counselors</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {data.counselors.map(counselor => (
                      <div key={counselor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{counselor.name}</div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{counselor.email}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Assigned Students</div>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{counselor.assigned_students}</div>
                          </div>
                          <div>
                            {counselor.is_online ? (
                              <span style={{ padding: '0.25rem 0.5rem', background: '#10b981', color: 'white', borderRadius: '4px', fontSize: '0.8rem' }}>Online</span>
                            ) : (
                              <span style={{ padding: '0.25rem 0.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '4px', fontSize: '0.8rem' }}>Offline</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;

