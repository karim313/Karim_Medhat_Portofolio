'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPortfolioData, Project } from '@/lib/portfolioData';

const GithubIcon = ({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(getPortfolioData().projects);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handler = () => setProjects(getPortfolioData().projects);
    window.addEventListener('portfolioDataUpdated', handler);
    return () => window.removeEventListener('portfolioDataUpdated', handler);
  }, []);

  return (
    <section id="projects" ref={ref}>
      <div className="container">
        <h2 style={{ marginBottom: '4rem', textAlign: 'center' }}>
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="project-card glass"
              style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', display: 'block', textDecoration: 'none', color: 'inherit' }}
            >
              <div className="image-container" style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                {project.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🗂️</div>
                )}
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3, 0, 20, 0.9), transparent)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="bg-gradient" style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white' }}>
                      <ExternalLink size={16} /> Live Demo
                    </div>
                    {project.github && (
                      <div 
                        onClick={(e) => { e.preventDefault(); window.open(project.github, '_blank'); }}
                        style={{ padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', background: 'rgba(255,255,255,0.1)', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <GithubIcon size={16} /> GitHub
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.7rem', padding: '0.3rem 0.8rem', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
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
