import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';
import TextReveal from '../components/motion/TextReveal';
import MagneticButton from '../components/motion/MagneticButton';
import { ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { registerSchool } = useAuth();
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Form State
  const [schoolData, setSchoolData] = useState({ name: '', address: '' });
  const [adminData, setAdminData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'ADMIN'
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (!schoolData.name) {
      setError("School name is required.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminData.email || !adminData.password || !adminData.first_name || !adminData.last_name) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await registerSchool(schoolData, adminData);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <div className="editorial" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            MindTrack.
          </div>
          <Link to="/login" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account? Sign in
          </Link>
        </header>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '440px' }}>
            <TextReveal>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                {step === 1 ? "Create your workspace" : "Set up your admin account"}
              </h1>
            </TextReveal>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              {step === 1 ? "Let's start by registering your school." : "Create the primary administrator account."}
            </p>

            {error && (
              <div style={{ padding: '1rem', background: '#FDECEC', color: '#D32F2F', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleNext}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    School Name
                  </label>
                  <input 
                    type="text" 
                    value={schoolData.name}
                    onChange={(e) => setSchoolData({...schoolData, name: e.target.value})}
                    placeholder="e.g. Springfield High"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    City / Location (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={schoolData.address}
                    onChange={(e) => setSchoolData({...schoolData, address: e.target.value})}
                    placeholder="e.g. Chicago, IL"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>

                <MagneticButton 
                  type="submit"
                  className="neomorphic"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Continue <ArrowRight size={18} />
                </MagneticButton>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      First Name
                    </label>
                    <input 
                      type="text" 
                      value={adminData.first_name}
                      onChange={(e) => setAdminData({...adminData, first_name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'transparent',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      value={adminData.last_name}
                      onChange={(e) => setAdminData({...adminData, last_name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'transparent',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none'
                      }}
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
                    value={adminData.email}
                    onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <input 
                    type="password" 
                    value={adminData.password}
                    onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      padding: '1rem 1.5rem',
                      background: 'transparent',
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Back
                  </button>
                  <MagneticButton 
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: loading ? 'wait' : 'pointer'
                    }}
                  >
                    {loading ? 'Setting up...' : 'Create workspace'}
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
