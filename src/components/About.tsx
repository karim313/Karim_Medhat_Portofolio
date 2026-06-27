'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getPortfolioData, AboutData } from '@/lib/portfolioData';

export default function About() {
  const [data, setData] = useState<AboutData>(getPortfolioData().about);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const handler = () => setData(getPortfolioData().about);
    window.addEventListener('portfolioDataUpdated', handler);
    return () => window.removeEventListener('portfolioDataUpdated', handler);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <motion.h2 variants={itemVariants} style={{ marginBottom: '2rem', textAlign: 'center' }}>
            About <span className="text-gradient">Me</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="glass"
            style={{ padding: '2.5rem', borderRadius: '30px', lineHeight: 1.8, fontSize: 'clamp(1rem, 3vw, 1.15rem)', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}
          >
            <p style={{ marginBottom: '1.5rem' }}>{data.bio1}</p>
            <p>{data.bio2}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="about-stats"
            style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}
          >
            {data.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass"
                style={{ textAlign: 'center', padding: '2rem 1.5rem', borderRadius: '20px' }}
              >
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--accent-tertiary)' }}>{stat.value}</div>
                <div style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '0.5rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
