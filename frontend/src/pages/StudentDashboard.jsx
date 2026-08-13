import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';
import MagneticButton from '../components/motion/MagneticButton';
import { Link } from 'react-router-dom';
import { ArrowRight, LogOut, FileText, CheckSquare, User as UserIcon } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('evaluation'); // details, evaluation, report
  
  // Evaluation State
  const [assessment, setAssessment] = useState(null);
  const [responses, setResponses] = useState({});
  const [evalLoading, setEvalLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Report State
  const [history, setHistory] = useState([]);
  
  // Details State
  const student = user?.student_profile;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiClient.get('/checkins/me');
        const formattedData = res.data.map(item => ({
          name: new Date(item.created_at).toLocaleDateString(),
          mood: item.mood,
          stress: item.stress,
          sleep: item.sleep
        }));
        setHistory(formattedData);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.id) fetchHistory();
  }, [user]);

  const fetchAssessment = async () => {
    setEvalLoading(true);
    try {
      const res = await apiClient.get('/assessments/active');
      setAssessment(res.data);
      // Initialize responses
      const initial = {};
      res.data.questions.forEach(q => initial[q.id] = 3); // default 3
      setResponses(initial);
    } catch (err) {
      console.error(err);
    } finally {
      setEvalLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'evaluation' && !assessment) {
      fetchAssessment();
    }
  }, [activeTab]);

  const handleSubmitAssessment = async () => {
    setSubmitting(true);
    try {
      const payload = {
        responses: Object.entries(responses).map(([qId, score]) => ({
          question_id: parseInt(qId),
          score: parseInt(score)
        }))
      };
      await apiClient.post(`/assessments/submit?assessment_id=${assessment.id}`, payload);
      alert('Assessment submitted successfully! The report has been sent to your parent\'s Email.');
      setActiveTab('report');
      // Refresh user to get updated student details
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to submit assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderTabs = () => (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
      <button 
        onClick={() => setActiveTab('details')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.5rem 1rem', fontSize: '1.1rem',
          color: activeTab === 'details' ? 'var(--text-primary)' : 'var(--text-secondary)',
          borderBottom: activeTab === 'details' ? '2px solid var(--text-primary)' : 'none',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}
      >
        <UserIcon size={18} /> Details
      </button>
      <button 
        onClick={() => setActiveTab('evaluation')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.5rem 1rem', fontSize: '1.1rem',
          color: activeTab === 'evaluation' ? 'var(--text-primary)' : 'var(--text-secondary)',
          borderBottom: activeTab === 'evaluation' ? '2px solid var(--text-primary)' : 'none',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}
      >
        <CheckSquare size={18} /> Evaluation
      </button>
      <button 
        onClick={() => setActiveTab('report')}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0.5rem 1rem', fontSize: '1.1rem',
          color: activeTab === 'report' ? 'var(--text-primary)' : 'var(--text-secondary)',
          borderBottom: activeTab === 'report' ? '2px solid var(--text-primary)' : 'none',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}
      >
        <FileText size={18} /> Report
      </button>
    </div>
  );

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '4rem 2rem' }}>
        
        {/* Header bar */}
        <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
          <span>Hi, {user?.first_name}</span>
          <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} title="Sign Out">
            <LogOut size={20} />
          </button>
        </div>

        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 className="editorial" style={{ fontSize: '2.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Student Portal
              </h1>
            </div>
            
            {/* Gamification Stats */}
            {student && (
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    🔥 {student.streak_count}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Week Streak</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    ⭐ {student.points}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Points</div>
                </div>
              </div>
            )}
          </header>

          {renderTabs()}

          {/* DETAILS TAB */}
          {activeTab === 'details' && (
            <div className="neomorphic" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Personal Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</p>
                  <p>{user?.first_name} {user?.last_name}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Parent Email</p>
                  <p>{student?.parent_email || 'Not provided'}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Assessment Frequency</p>
                  <p>{student?.assessment_frequency}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Risk Category</p>
                  <p>Category {student?.risk_category}</p>
                </div>
              </div>
            </div>
          )}

          {/* EVALUATION TAB */}
          {activeTab === 'evaluation' && (
            <div className="neomorphic" style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Dynamic Assessment</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Answer the following 15 questions honestly on a scale of 1 to 5. (1 = Poor/Strongly Disagree, 5 = Excellent/Strongly Agree).
              </p>

              {evalLoading ? (
                <p>Generating personalized assessment questions...</p>
              ) : assessment?.questions ? (
                <div>
                  {assessment.questions.map((q, idx) => (
                    <div key={q.id} style={{ marginBottom: '2rem' }}>
                      <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>{idx + 1}. {q.question_text}</p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {[1, 2, 3, 4, 5].map(score => (
                          <label key={score} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                            <input 
                              type="radio" 
                              name={`q-${q.id}`} 
                              value={score} 
                              checked={responses[q.id] === score}
                              onChange={() => setResponses(prev => ({ ...prev, [q.id]: score }))}
                            />
                            {score}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <MagneticButton 
                    onClick={handleSubmitAssessment}
                    disabled={submitting}
                    style={{
                      padding: '1rem 2rem',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {submitting ? 'Evaluating...' : 'Submit Assessment'}
                  </MagneticButton>
                </div>
              ) : (
                <p>Could not load assessment.</p>
              )}
            </div>
          )}

          {/* REPORT TAB */}
          {activeTab === 'report' && (
            <div>
              <div className="neomorphic" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Latest Assessment Result</h3>
                {student?.risk_category === 1 && (
                  <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '8px', marginBottom: '1rem' }}>
                    <strong>Category 1:</strong> You are doing great! No counseling needed. Your assessments are monthly.
                  </div>
                )}
                {student?.risk_category === 2 && (
                  <div style={{ padding: '1rem', background: '#fff3cd', color: '#856404', borderRadius: '8px', marginBottom: '1rem' }}>
                    <strong>Category 2:</strong> You might need a little attention. Your assessments will be weekly for closer monitoring. 
                    {student.assigned_counselor_id ? ' A counselor has been assigned.' : ''}
                  </div>
                )}
                {student?.risk_category === 3 && (
                  <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '8px', marginBottom: '1rem' }}>
                    <strong>Category 3:</strong> You need severe attention. A mental health professional will reach out to you immediately.
                  </div>
                )}
                <p style={{ color: 'var(--text-secondary)' }}>
                  A full textual report has been generated and sent to your parent's registered contact information.
                </p>
              </div>

              {/* Historical Trend */}
              <div className="neomorphic" style={{ padding: '3rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Your Mood Trend
                </h3>
                
                {history.length > 0 ? (
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
                ) : (
                  <p style={{ marginTop: '2rem', color: 'var(--text-secondary)' }}>No historical check-in data yet.</p>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
