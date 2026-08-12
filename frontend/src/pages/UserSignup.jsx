import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import PageTransition from '../components/motion/PageTransition';
import TextReveal from '../components/motion/TextReveal';
import MagneticButton from '../components/motion/MagneticButton';
import { ArrowRight } from 'lucide-react';
import apiClient from '../api/client';

const UserSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialRole = searchParams.get('role') || 'STUDENT';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [schools, setSchools] = useState([]);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: initialRole,
    school_id: ''
  });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await apiClient.get('/auth/schools');
        setSchools(res.data);
      } catch (err) {
        console.error("Failed to fetch schools");
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.school_id) {
      setError("Please select a school.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Direct registration call
      await apiClient.post('/auth/register', formData);
      navigate('/login?registered=true');
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <Link to="/" className="editorial" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            MindTrack.
          </Link>
          <Link to="/login" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account? Sign in
          </Link>
        </header>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <TextReveal>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                Join MindTrack
              </h1>
            </TextReveal>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Create an account as a Student or Counselor.
            </p>

            {error && (
              <div style={{ padding: '1rem', background: '#FDECEC', color: '#D32F2F', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  I am a
                </label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                >
                  <option value="STUDENT">Student</option>
                  <option value="COUNSELOR">Counselor</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  School
                </label>
                <select 
                  value={formData.school_id}
                  onChange={(e) => setFormData({...formData, school_id: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                  required
                >
                  <option value="" disabled>Select your school</option>
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.first_name}
                    onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={formData.last_name}
                    onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '1rem', outline: 'none' }}
                  required
                />
              </div>

              <MagneticButton 
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '1rem', background: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {loading ? 'Creating account...' : 'Create Account'} <ArrowRight size={18} />
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSignup;
