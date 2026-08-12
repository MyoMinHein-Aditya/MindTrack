import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PageTransition from '../components/motion/PageTransition';
import TextReveal from '../components/motion/TextReveal';
import { User, Users, Shield } from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: 'Student',
      description: 'Sign in to access your check-ins and dashboard.',
      icon: <User size={32} color="var(--accent-primary)" />,
      path: '/login',
    },
    {
      title: 'Counselor',
      description: 'Sign in to monitor student well-being and insights.',
      icon: <Users size={32} color="var(--accent-primary)" />,
      path: '/login',
    },
    {
      title: 'Administrator',
      description: 'Register a new school workspace or sign in to your admin dashboard.',
      icon: <Shield size={32} color="var(--accent-primary)" />,
      path: '/register',
    },
  ];

  return (
    <PageTransition>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link to="/" className="editorial" style={styles.logo}>
            MindTrack.
          </Link>
          <Link to="/login" style={styles.signInLink}>
            Already have an account? Sign in
          </Link>
        </header>

        <div style={styles.content}>
          <TextReveal>
            <h1 style={styles.title}>Welcome to MindTrack</h1>
          </TextReveal>
          <p style={styles.subtitle}>
            Please select your role to continue.
          </p>

          <div style={styles.grid}>
            {options.map((option, index) => (
              <div 
                key={index} 
                className="neomorphic" 
                style={styles.card}
                onClick={() => navigate(option.path)}
              >
                <div style={styles.iconWrapper}>
                  {option.icon}
                </div>
                <h2 style={styles.cardTitle}>{option.title}</h2>
                <p style={styles.cardDescription}>{option.description}</p>
                <div style={styles.cardAction}>
                  {option.title === 'Administrator' ? 'Register School →' : 'Sign In →'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: 'var(--bg-primary)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem',
  },
  logo: {
    fontSize: '1.5rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  signInLink: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '4rem',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    width: '100%',
  },
  card: {
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  iconWrapper: {
    padding: '1.5rem',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: '50%',
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  cardDescription: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: '2rem',
    flex: 1,
  },
  cardAction: {
    color: 'var(--text-primary)',
    fontWeight: 500,
    fontSize: '1rem',
  },
};

export default GetStarted;
