import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const Trusted = () => {
  const { t } = useLanguage();
  useScrollAnimation();

  const logos = [
    { text: "🎮 Gamers", color: "#667eea" },
    { text: "💻 Developers", color: "#4ade80" },
    { text: "🎨 Designers", color: "#f472b6" },
    { text: "📚 Students", color: "#facc15" },
    { text: "🏢 Professionals", color: "#60a5fa" },
    { text: "🎵 Musicians", color: "#c084fc" },
  ];

  // duplicate array for seamless loop
  const marqueeItems = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="trusted-section">
        <div className="container">
            <p className="trusted-text animate-on-scroll">{t('trusted.text')}</p>
            
            <div className="trusted-logos-wrapper">
                <div className="trusted-gradient-left"></div>
                <div className="trusted-gradient-right"></div>
                
                <motion.div 
                    className="trusted-marquee"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((item, index) => (
                        <span 
                            key={index} 
                            className="tech-logo"
                            style={{ 
                                display: "inline-flex", 
                                alignItems: "center", 
                                gap: "8px",
                                margin: "0 30px", 
                                fontSize: "1.2rem", 
                                fontWeight: "600",
                                color: "rgba(255, 255, 255, 0.8)",
                                whiteSpace: "nowrap"
                            }}
                        >
                           {item.text}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default Trusted;
