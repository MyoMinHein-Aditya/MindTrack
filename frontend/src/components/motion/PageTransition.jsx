import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const nodeRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = nodeRef.current;
    
    // Animate in
    gsap.fromTo(
      el,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [location.pathname]);

  return (
    <div ref={nodeRef} style={{ width: '100%' }}>
      {children}
    </div>
  );
};

export default PageTransition;
