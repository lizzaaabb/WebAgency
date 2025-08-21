import React, { useEffect, useState } from 'react';
import '../styles/CardHeader.css';

function CardHeader() {
  const [opacity, setOpacity] = useState(1);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Get the Card3 component element
      const card3Element = document.querySelector('.card3-slideshow-wrapper');
      
      if (card3Element) {
        const card3Rect = card3Element.getBoundingClientRect();
        const card3Bottom = card3Rect.bottom;
        const windowHeight = window.innerHeight;
        
        // Calculate fade effect
        // Start fading when Card3 is 200px from finishing
        const fadeStartPoint = windowHeight + 200;
        const fadeEndPoint = windowHeight;
        
        if (card3Bottom <= fadeEndPoint) {
          // Completely faded and not sticky
          setOpacity(0);
          setTimeout(() => setIsSticky(false), 300); // Delay to let fade complete
        } else if (card3Bottom <= fadeStartPoint) {
          // Fading zone - calculate opacity based on position
          const fadeProgress = (card3Bottom - fadeEndPoint) / (fadeStartPoint - fadeEndPoint);
          setOpacity(Math.max(0, Math.min(1, fadeProgress)));
          setIsSticky(true);
        } else {
          // Fully visible
          setOpacity(1);
          setIsSticky(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`card-header1 ${!isSticky ? 'card-header1-not-sticky' : ''}`}
      style={{ opacity }}
    >
      <h2>Why Us?</h2>
    </div>
  );
}

export default CardHeader;