import React, { useState } from 'react';
import { ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';

export default function StudentCheckIn() {
  const [step, setStep] = useState(0);
  const [checkinData, setCheckinData] = useState({
    mood: null,
    stress: null,
    sleep: null,
    concern: '',
    free_text: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { user, logout } = useAuth();

  const questions = [
    { id: 'mood', text: 'How has your mood been lately?' },
    { id: 'stress', text: 'How much stress are you feeling?' },
    { id: 'sleep', text: 'How well have you been sleeping?' }
  ];

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else if (step === questions.length - 1) {
      setStep(s => s + 1); // Go to final text step
    } else {
      await submitCheckIn();
    }
  };

  const submitCheckIn = async () => {
    setSubmitting(true);
    try {
      await apiClient.post('/checkins/', checkinData);
      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit check-in.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleScore = (val) => {
    setCheckinData(prev => ({ ...prev, [questions[step].id]: val }));
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div className="neomorphic" style={styles.card}>
          <CheckCircle size={48} color="var(--accent-primary)" />
          <h2 style={{marginTop: '1rem'}}>Check-in Complete</h2>
          <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>
            Thank you for checking in, {user?.first_name}. Your responses are saved securely.
          </p>
          <Link to="/student/dashboard">
            <button style={styles.btnPrimary}>View Dashboard</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <span>Hi, {user?.first_name}</span>
          <button onClick={logout} style={styles.iconBtn} title="Sign Out">
            <LogOut size={20} />
          </button>
        </div>
        
        <div className="neomorphic" style={styles.card}>
          {step < questions.length ? (
            <>
              <div style={styles.progress}>
                Question {step + 1} of {questions.length + 1}
              </div>
              
              <h2 style={styles.questionText}>
                {questions[step].text}
              </h2>

              <div style={styles.sliderContainer}>
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    className={`neomorphic-inset ${checkinData[questions[step].id] === val ? 'active' : ''}`}
                    style={{
                      ...styles.scoreBtn,
                      background: checkinData[questions[step].id] === val ? 'var(--accent-primary)' : 'var(--bg-primary)',
                      color: checkinData[questions[step].id] === val ? '#fff' : 'var(--text-primary)'
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
                disabled={!checkinData[questions[step].id]}
                style={{
                  ...styles.btnNext,
                  opacity: (checkinData[questions[step].id]) ? 1 : 0.5,
                  cursor: (checkinData[questions[step].id]) ? 'pointer' : 'not-allowed'
                }}
              >
                Next <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <>
              <div style={styles.progress}>
                Final Step
              </div>
              
              <h2 style={styles.questionText}>
                Anything specific on your mind?
              </h2>

              <textarea 
                className="neomorphic-inset"
                style={styles.textArea}
                placeholder="Optional: Tell us what's causing concern..."
                value={checkinData.free_text}
                onChange={(e) => setCheckinData(prev => ({...prev, free_text: e.target.value}))}
              />

              <button 
                onClick={handleNext} 
                disabled={submitting}
                style={{
                  ...styles.btnNext,
                  opacity: !submitting ? 1 : 0.5,
                  cursor: !submitting ? 'pointer' : 'not-allowed'
                }}
              >
                {submitting ? 'Submitting...' : 'Submit'} <ArrowRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </PageTransition>
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
  textArea: {
    width: '100%',
    height: '120px',
    padding: '1rem',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    marginBottom: '2rem',
    resize: 'vertical'
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
