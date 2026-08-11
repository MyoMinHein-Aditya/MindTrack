import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function StudentCheckIn() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await apiClient.get('/assessments/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to load questions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      await submitAssessment();
    }
  };

  const submitAssessment = async () => {
    setSubmitting(true);
    try {
      const responses = Object.keys(scores).map(qId => ({
        question_id: parseInt(qId),
        score: scores[qId]
      }));
      
      await apiClient.post('/assessments/submit', { responses });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleScore = (val) => {
    setScores(prev => ({ ...prev, [questions[step].id]: val }));
  };

  if (loading) {
    return <div style={styles.container}>Loading check-in...</div>;
  }

  if (questions.length === 0) {
    return <div style={styles.container}>No active questions available.</div>;
  }

  if (submitted) {
    return (
      <div style={styles.container}>
        <div className="neomorphic" style={styles.card}>
          <CheckCircle size={48} color="var(--accent-primary)" />
          <h2 style={{marginTop: '1rem'}}>Check-in Complete</h2>
          <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>
            Thank you for checking in, {user?.first_name}. Your responses are saved securely.
          </p>
          <button onClick={logout} style={styles.btnPrimary}>Sign Out</button>
        </div>
      </div>
    );
  }

  const q = questions[step];

  return (
    <div style={styles.container}>
      {/* Header bar for logout */}
      <div style={styles.topBar}>
        <span>Hi, {user?.first_name}</span>
        <button onClick={logout} style={styles.iconBtn} title="Sign Out">
          <LogOut size={20} />
        </button>
      </div>
      
      <div className="neomorphic" style={styles.card}>
        <div style={styles.progress}>
          Question {step + 1} of {questions.length}
        </div>
        
        <h2 style={styles.questionText}>
          {q.text}
        </h2>

        <div style={styles.sliderContainer}>
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              className={`neomorphic-inset ${scores[q.id] === val ? 'active' : ''}`}
              style={{
                ...styles.scoreBtn,
                background: scores[q.id] === val ? 'var(--accent-primary)' : 'var(--bg-primary)',
                color: scores[q.id] === val ? '#fff' : 'var(--text-primary)'
              }}
              onClick={() => handleScore(val)}
            >
              {val}
            </button>
          ))}
        </div>
        <div style={styles.labels}>
          <span>Struggling</span>
          <span>Great</span>
        </div>

        <button 
          onClick={handleNext} 
          disabled={!scores[q.id] || submitting}
          style={{
            ...styles.btnNext,
            opacity: (scores[q.id] && !submitting) ? 1 : 0.5,
            cursor: (scores[q.id] && !submitting) ? 'pointer' : 'not-allowed'
          }}
        >
          {submitting ? 'Submitting...' : step === questions.length - 1 ? 'Submit' : 'Next'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  },
  card: {
    padding: '3rem',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  progress: {
    color: 'var(--accent-secondary)',
    fontWeight: 500,
    fontSize: '0.9rem',
    marginBottom: '1rem',
    letterSpacing: '0.05em'
  },
  questionText: {
    fontSize: '2rem',
    fontWeight: 500,
    marginBottom: '3rem',
    lineHeight: 1.2
  },
  sliderContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '1rem'
  },
  scoreBtn: {
    width: '60px',
    height: '60px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.2rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  labels: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '340px',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    marginBottom: '3rem'
  },
  btnNext: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    padding: '1rem 2rem',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    transition: 'opacity 0.2s ease'
  },
  btnPrimary: {
    marginTop: '2rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    padding: '0.8rem 1.5rem',
    borderRadius: '30px',
    fontWeight: 500,
    fontSize: '0.9rem'
  },
  topBar: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontWeight: 500
  },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem',
    transition: 'color 0.2s'
  }
};
