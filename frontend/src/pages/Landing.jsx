import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageTransition from '../components/motion/PageTransition';
import TextReveal from '../components/motion/TextReveal';
import MagneticButton from '../components/motion/MagneticButton';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const problemRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    // Problem Section Parallax
    gsap.fromTo(problemRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: 1
        }
      }
    );

    // Dynamic Indicator Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: indicatorRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        pin: true
      }
    });

    tl.to(".indicator-bar", { width: "40%", backgroundColor: "#D8A96B", duration: 1 })
      .to(".indicator-text", { opacity: 0, duration: 0.2 }, "<")
      .to(".indicator-text-new", { opacity: 1, duration: 0.2 }, ">")
      .to(".indicator-bar", { width: "20%", backgroundColor: "#D32F2F", duration: 1 })
      .to(".notice-text", { opacity: 1, y: 0, duration: 1 });

  }, []);

  return (
    <PageTransition>
      <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        
        {/* Navigation */}
        <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <div className="editorial" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
            MindTrack.
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/login" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Sign in</Link>
            <Link to="/get-started" style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', borderBottom: '1px solid var(--text-primary)', paddingBottom: '2px' }}>Get started</Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <TextReveal delay={0.2}>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Understand well-being<br />before it becomes a crisis.
              </h1>
            </TextReveal>
            
            <TextReveal delay={0.4}>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                MindTrack helps schools notice meaningful changes early, coordinate human support, and track outcomes — without turning emotional data into a surveillance system.
              </p>
            </TextReveal>
            
            <TextReveal delay={0.6}>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <Link to="/get-started">
                  <MagneticButton 
                    className="neomorphic"
                    style={{
                      padding: '1.25rem 2.5rem',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    Get started <ArrowRight size={18} />
                  </MagneticButton>
                </Link>
                <Link to="/login" style={{ fontSize: '1rem', color: 'var(--text-secondary)', padding: '1rem' }}>
                  Sign in
                </Link>
              </div>
            </TextReveal>
          </div>
        </section>

        {/* The Problem Section */}
        <section style={{ padding: '10rem 0', backgroundColor: 'var(--bg-surface)' }}>
          <div className="container">
            <div ref={problemRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 className="editorial" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.2, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Most problems don't begin as emergencies. They begin as subtle shifts in sleep, academic pressure, and social connection.
              </h2>
              <p style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                By the time a student asks for help, the pattern has often been running for weeks. We built a way to see the pattern forming, respectfully.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Visualization Section */}
        <section ref={indicatorRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
          <div className="container" style={{ width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              
              <div>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                  A simple check-in.
                </h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem' }}>
                  Students complete a tactile, one-minute check-in weekly. MindTrack silently tracks the longitudinal delta.
                </p>
                <h3 className="notice-text" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', opacity: 0, transform: 'translateY(20px)' }}>
                  MindTrack notices<br/>the pattern.
                </h3>
              </div>

              <div className="neomorphic" style={{ padding: '3rem', position: 'relative' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>Sleep Quality</span>
                    <div style={{ position: 'relative', width: '50px', height: '20px' }}>
                      <span className="indicator-text" style={{ position: 'absolute', right: 0 }}>Stable</span>
                      <span className="indicator-text-new" style={{ position: 'absolute', right: 0, opacity: 0, color: '#D32F2F' }}>Declining</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div className="indicator-bar" style={{ width: '75%', height: '100%', backgroundColor: 'var(--accent-primary)', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>Academic Pressure</span>
                    <span>High</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#D8A96B', borderRadius: '4px' }}></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Landing;
