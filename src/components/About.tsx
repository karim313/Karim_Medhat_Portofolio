'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          <motion.h2 
            variants={itemVariants} 
            style={{ marginBottom: '2rem', textAlign: 'center' }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>

          <motion.div 
            variants={itemVariants} 
            className="glass" 
            style={{ 
              padding: '2.5rem', 
              borderRadius: '30px', 
              lineHeight: 1.8, 
              fontSize: 'clamp(1rem, 3vw, 1.15rem)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
            }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              I am a passionate Front-End Developer with a focus on creating highly interactive, 
              premium web experiences. My expertise lies in <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>React</span> and 
              <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}> Next.js</span>, where I blend logic with 
              creativity to build performant and visually stunning applications.
            </p>
            <p>
              I believe that performance and aesthetics should go hand in hand. Every animation I build
              is GPU-accelerated and optimized to ensure a 60fps experience for the user. My goal is
              to push the boundaries of what&apos;s possible on the web while maintaining accessibility
              and speed.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="about-stats"
            style={{ 
              marginTop: '4rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              { label: 'Experience', value: '2+ Years' },
              { label: 'Projects', value: '15+ Completed' },
              { label: 'Location', value: 'Egypt' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass"
                style={{ 
                  textAlign: 'center', 
                  padding: '2rem 1.5rem', 
                  borderRadius: '20px'
                }}
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
