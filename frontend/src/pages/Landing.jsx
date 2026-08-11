import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // Parallax hero effect
    gsap.to(heroRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, []);

  return (
    <main style={{ minHeight: '200vh' }}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.logo}>MINDTRACK</div>
        <div style={styles.navLinks}>
          <Link to="/counselor/dashboard">Counselor Portal</Link>
          <Link to="/student/check-in" style={styles.btnOutline}>Student Check-In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <h1 ref={titleRef} style={styles.h1}>
            <span className="editorial">Early insight.</span><br/>
            Timely support.<br/>
            <span className="editorial">Better well-being.</span>
          </h1>
          
          <p ref={subtitleRef} style={styles.subtitle}>
            A privacy-first, web-based student well-being assessment, longitudinal tracking, and early-warning platform for schools.
          </p>

          <div ref={ctaRef} style={styles.ctaGroup}>
            <Link to="/login?redirect=/student/check-in" style={styles.btnPrimary}>
              I'm a Student
            </Link>
            <Link to="/login?redirect=/counselor/dashboard" style={styles.btnSecondary}>
              I'm a Counselor
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section style={styles.featuresSection}>
        <div className="container" style={styles.featuresGrid}>
          <div className="neomorphic" style={styles.featureCard}>
            <Activity size={32} color="var(--accent-primary)" />
            <h3 style={styles.cardTitle}>Longitudinal Tracking</h3>
            <p style={styles.cardText}>Track nuanced changes across 7 critical well-being factors over time, moving beyond simple static scores.</p>
          </div>
          
          <div className="neomorphic" style={styles.featureCard}>
            <TrendingUp size={32} color="var(--accent-secondary)" />
            <h3 style={styles.cardTitle}>Trend Engine Alerts</h3>
            <p style={styles.cardText}>Automated early-warnings detect sudden drops or sustained declines, prioritizing counselor intervention.</p>
          </div>

          <div className="neomorphic" style={styles.featureCard}>
            <ShieldCheck size={32} color="var(--text-primary)" />
            <h3 style={styles.cardTitle}>Privacy First</h3>
            <p style={styles.cardText}>No microphones. No cameras. No social media scraping. Opt-in assessments with strict school data boundaries.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    mixBlendMode: 'difference',
    color: '#F4F1EA' // Always light so difference makes it contrast against light bg
  },
  logo: {
    fontWeight: 700,
    letterSpacing: '0.1em',
    fontSize: '0.9rem'
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    fontSize: '0.9rem',
    fontWeight: 500
  },
  hero: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '5rem',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  h1: {
    fontSize: 'clamp(4rem, 8vw, 8rem)',
    lineHeight: 0.9,
    letterSpacing: '-0.03em',
    margin: 0
  },
  subtitle: {
    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    lineHeight: 1.4
  },
  ctaGroup: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '2rem',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--text-primary)',
    color: 'var(--bg-primary)',
    padding: '1rem 2rem',
    borderRadius: '30px',
    fontWeight: 500,
    fontSize: '1rem'
  },
  btnSecondary: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--text-primary)',
    padding: '1rem 2rem',
    borderRadius: '30px',
    fontWeight: 500,
    fontSize: '1rem'
  },
  btnOutline: {
    border: '1px solid currentColor',
    padding: '0.5rem 1rem',
    borderRadius: '20px'
  },
  featuresSection: {
    padding: '8rem 0',
    backgroundColor: 'var(--bg-primary)',
    position: 'relative',
    zIndex: 2
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    marginTop: '1rem'
  },
  cardText: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6
  }
};
