import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, delay = 0, className = "" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    
    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  }, [delay]);

  return (
    <div style={{ overflow: 'hidden' }} className={className}>
      <div ref={textRef}>
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
