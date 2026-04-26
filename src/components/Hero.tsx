'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const roles = [
  "Front-End Developer",
  "React & Next.js Specialist",
  "Building High-Performance Web Apps"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-300, 300], [5, -5]);
  const rotateY = useTransform(dx, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = roles[roleIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section ">
      <div className="container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-text"
          >
            <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--accent-primary)', marginBottom: '1rem', fontWeight: 600 }}>
              Hi, I&apos;m Kareem Medhat
            </h2>
            <h1 className="hero-heading" style={{ marginBottom: '1.5rem', fontWeight: 800 }}>
              Creative <span className="text-gradient">Developer</span>
            </h1>
            <div style={{ minHeight: '3.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', opacity: 0.8, fontFamily: 'var(--font-outfit)', marginBottom: '1rem' }}>
              {currentText}<span className="animate-pulse-custom">|</span>
            </div>
            
            <motion.div
              className="hero-buttons"
              style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#projects" className="bg-gradient" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', color: 'white' }}>
                View Work
              </a>
              <a href="#contact" className="glass" style={{ padding: '1rem 2.5rem', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', color: 'white' }}>
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            style={{ 
              display: 'flex', 
              justifyContent: 'center',
              perspective: 1000,
              rotateX,
              rotateY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className="hero-image-wrapper"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: 'relative',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                overflow: 'hidden',
                border: '4px solid var(--accent-primary)',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)'
              }}>
              <Image 
                src="/hero.jpg" 
                alt="Kareem Medhat" 
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
