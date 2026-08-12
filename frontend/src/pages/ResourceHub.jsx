import React from 'react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/motion/PageTransition';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Phone, Heart } from 'lucide-react';

export default function ResourceHub() {
  return (
    <PageTransition>
      <div style={styles.container}>
        <header style={styles.header}>
          <Link to="/student/dashboard" style={styles.backBtn}>
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <h1 className="editorial" style={styles.h1}>Resource Hub</h1>
          <p style={styles.subtitle}>Curated articles, helplines, and coping strategies for Indian students.</p>
        </header>

        <div style={styles.grid}>
          
          {/* Helplines Card */}
          <div className="neomorphic" style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}><Phone size={24} color="#e74c3c" /></div>
              <h2 style={styles.cardTitle}>24/7 Helplines (India)</h2>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Tele-MANAS:</strong> 14416 or 1800-891-4416 (National initiative by Govt. of India)
              </li>
              <li style={styles.listItem}>
                <strong>Vandrevala Foundation:</strong> +91 9999 666 555 (Call or WhatsApp)
              </li>
              <li style={styles.listItem}>
                <strong>iCALL (TISS):</strong> 1800-2222-11 (Mon–Sat, 10 AM – 8 PM)
              </li>
              <li style={styles.listItem}>
                <strong>AASRA:</strong> +91-22-27546669 (For emotional crisis or suicidal thoughts)
              </li>
            </ul>
          </div>

          {/* Coping Strategies Card */}
          <div className="neomorphic" style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}><Heart size={24} color="var(--accent-primary)" /></div>
              <h2 style={styles.cardTitle}>Effective Coping Strategies</h2>
            </div>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <strong>Prioritize Sleep:</strong> Aim for 7–9 hours. Lack of sleep impairs concentration and increases stress.
              </li>
              <li style={styles.listItem}>
                <strong>Balanced Routine:</strong> Use Pomodoro-style breaks (5–10 mins rest after every 45 mins study).
              </li>
              <li style={styles.listItem}>
                <strong>Mindfulness & Breathing:</strong> Practice deep belly breathing to calm your nervous system before exams.
              </li>
              <li style={styles.listItem}>
                <strong>Digital Detox:</strong> Limit social media consumption to reduce anxiety and comparisons.
              </li>
            </ul>
          </div>

          {/* Article Highlight */}
          <div className="neomorphic" style={{...styles.card, gridColumn: '1 / -1'}}>
            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}><BookOpen size={24} color="var(--text-primary)" /></div>
              <h2 style={styles.cardTitle}>Managing Academic Pressure in India</h2>
            </div>
            <div style={styles.articleContent}>
              <p>
                The academic environment in India can be highly competitive, often leading to immense pressure on students. 
                Whether you're preparing for board exams, JEE, NEET, or university finals, it's crucial to remember that 
                your mental health is just as important as your academic performance.
              </p>
              <br/>
              <p>
                <strong>Setting Realistic Goals:</strong> Break large tasks into smaller, manageable steps. Instead of looking at 
                the entire syllabus, focus on one chapter at a time. This reduces the feeling of being overwhelmed.
              </p>
              <br/>
              <p>
                <strong>Seeking Help:</strong> Reaching out is a sign of strength. Many college campuses now have dedicated counselling 
                centres. If stress feels unmanageable or interferes with your daily life, consider professional counselling. 
                There is no shame in asking for help.
              </p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '3rem'
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: 500,
    marginBottom: '2rem',
    transition: 'color 0.2s'
  },
  h1: {
    fontSize: '2.5rem',
    fontWeight: 500,
    letterSpacing: '-0.02em',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -3px -3px 7px rgba(255,255,255,0.7)'
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: 500
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  listItem: {
    lineHeight: 1.5,
    color: 'var(--text-secondary)'
  },
  articleContent: {
    lineHeight: 1.6,
    color: 'var(--text-secondary)',
    fontSize: '1.05rem'
  }
};
