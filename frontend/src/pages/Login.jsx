import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const redirectUrl = searchParams.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const user = await login(email, password);
      
      // If no specific redirect was passed, route based on role
      if (searchParams.get('redirect')) {
         navigate(redirectUrl);
      } else {
         if (user.role === 'STUDENT') navigate('/student/dashboard');
         else if (user.role === 'COUNSELOR') navigate('/counselor/dashboard');
         else if (user.role === 'ADMIN') navigate('/admin/dashboard');
         else navigate('/'); // fallback
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div className="neomorphic" style={styles.card}>
        <div style={styles.iconWrapper}>
          <Lock size={32} color="var(--accent-primary)" />
        </div>
        
        <h2 style={styles.title}>Secure Login</h2>
        <p style={styles.subtitle}>Enter your school credentials to continue.</p>

        {error && <div style={styles.errorBanner}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neomorphic-inset"
              style={styles.input}
              placeholder="e.g. student@demo.com"
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="neomorphic-inset"
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            style={{...styles.btnSubmit, opacity: loading ? 0.7 : 1}}
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
          </button>
        </form>
        
        <div style={styles.demoNote}>
          <p><strong>Demo Accounts:</strong> password is always <code>demo123</code></p>
          <p>• student@demo.com</p>
          <p>• counselor@demo.com</p>
        </div>
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/get-started" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
        </div>
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
    padding: '2rem',
    backgroundColor: 'var(--bg-primary)'
  },
  card: {
    width: '100%',
    maxWidth: '450px',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconWrapper: {
    padding: '1rem',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '50%',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  errorBanner: {
    backgroundColor: '#e74c3c22',
    color: '#e74c3c',
    padding: '0.8rem 1rem',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    textAlign: 'center',
    fontWeight: 500
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'var(--text-secondary)'
  },
  input: {
    padding: '1rem',
    border: 'none',
    fontSize: '1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
    outline: 'none'
  },
  btnSubmit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    padding: '1rem',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'opacity 0.2s'
  },
  demoNote: {
    marginTop: '2rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    lineHeight: 1.6
  }
};
