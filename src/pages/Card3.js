import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/Card3.css';

const card3Data = [
  {
    title: 'Authenticity',
    text: `We want to craft digital experiences that reflect your essence. When authenticity drives your brand, it naturally stands out and creates a seamless alignment with its true purpose, forging deeper connections along the way.`,
    icon: require('../pics/l1.png')
  },
  {
    title: 'Connection',
    text: `Behind every project is a human story, and we're committed to making sure your voice is heard every step of the way. Business isn't just business—it's about relationships and creating something real together.`,
    icon: require('../pics/l2.png')
  },
  {
    title: 'Why Not.',
    text: `Because while some agencies are busy promising unicorns and #1 Google rankings by next Tuesday, we're creating websites that turn heads instead of tabs. Revolutionary concept: we build sites that don't suck.`,
    icon: require('../pics/l3.png')
  }
];

function Card3() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress line height based on scroll
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // First card always visible, others fade in/out smoothly
  const cardOpacities = [
    useTransform(scrollYProgress, [0, 0.25], [1, 0]), // First card starts visible, fades out
    useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.65], [0, 1, 1, 0]), // Fixed Connection card opacity
    useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1])
  ];

  return (
    <div className="card3-slideshow-wrapper">
      {/* Tall container to create scroll distance */}
      <div 
        ref={containerRef}
        className="card3-scroll-container"
        style={{ height: `${card3Data.length * 70}vh` }}
      >
        {/* Sticky container that stays in place */}
        <div className="card3-sticky-container">
          {/* Progress line indicator */}
          <div className="progress-line-container">
            <motion.div 
              className="progress-line"
              style={{ height: progressHeight }}
            />
          </div>
          
          <div className="card3-body">
            {card3Data.map((item, index) => (
              <motion.div
                key={index}
                className="card3-inner"
                style={{
                  opacity: cardOpacities[index]
                }}
                initial={{ opacity: index === 0 ? 1 : 0 }} // First card starts visible
                transition={{ 
                  opacity: { duration: 0.6, ease: "easeInOut" }
                }}
              >
                {/* Content Container */}
                <div className="card3-content">
                  {/* Icon */}
                  <div className="card3-icon-container">
                    <img 
                      src={item.icon} 
                      alt={item.title}
                      className="card3-icon"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="cardtxt">
                    {item.title}
                  </h2>

                  {/* Text */}
                  <div className="card3-paragraph">
                    {item.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card3;