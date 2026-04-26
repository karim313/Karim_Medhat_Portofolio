'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "Premium E-Commerce",
    description: "A high-performance e-commerce platform built with Next.js 14, featuring server-side rendering for SEO, optimized cart state management with Zustand, and silky-smooth page transitions powered by Framer Motion. Achieved a 98 Lighthouse performance score.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    link: "https://e-commerce-five-tawny-65.vercel.app",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Zustand"]
  },
  {
    title: "Al-Shakhs Trading",
    description: "Corporate trading website engineered for speed and trust. Built with React and Vite for instant HMR and lightning-fast builds. Uses CSS Modules for scoped styling, custom scroll animations, and responsive data tables for real-time commodity listings.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    link: "https://alshakhs-trading.vercel.app",
    tags: ["React", "Vite", "CSS Modules", "Responsive"]
  },
  {
    title: "Portfolio V2",
    description: "An earlier iteration of this portfolio showcasing advanced canvas animations, WebGL particle effects, and a fully custom design system. Served as the testing ground for gesture-based interactions and scroll-driven storytelling.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    link: "#",
    tags: ["React", "Canvas API", "GSAP", "WebGL"]
  },
  {
    title: "Fake Portfolio",
    description: "A visually striking personal portfolio crafted with Next.js and Framer Motion, featuring an interactive gradient mesh background, custom spring-physics cursor, scroll progress tracking, parallax hero with typing animation, and staggered entrance animations throughout.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
    link: "https://fake-portofolio.vercel.app",
    tags: ["Next.js", "Framer Motion", "CSS Variables", "Responsive"]
  }
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <h2 style={{ marginBottom: '4rem', textAlign: 'center' }}>
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="project-card glass"
              style={{ 
                borderRadius: '24px', 
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div className="image-container" style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
                  }}
                />
                <div className="overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(3, 0, 20, 0.9), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem'
                }}>
                  <div className="bg-gradient" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                    <ExternalLink size={16} /> Live Demo
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{project.description}</p>
                
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '50px', 
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
