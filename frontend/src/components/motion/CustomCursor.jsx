import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;
    
    const cursor = cursorRef.current;
    
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };
    
    // Add hover effects for interactive elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea')) {
        cursor.classList.add('active');
      } else {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}></div>
  );
}
