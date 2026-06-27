'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getPortfolioData, Skill } from '@/lib/portfolioData';
import {
  Code2, Layers, Cpu, Globe, Smartphone, Zap, Frame, Palette,
  GitBranch, PenTool, Server, Terminal, Workflow, Star
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  'React': <Code2 size={22} />, 'Next.js': <Layers size={22} />, 'TypeScript': <Cpu size={22} />,
  'Framer Motion': <Frame size={22} />, 'Tailwind CSS': <Zap size={22} />,
  'Git & GitHub': <GitBranch size={22} />, 'REST APIs': <Server size={22} />,
  'CI/CD': <Workflow size={22} />, 'CLI & Scripts': <Terminal size={22} />,
  'UI/UX Design': <Palette size={22} />, 'Figma': <PenTool size={22} />,
  'Responsive': <Smartphone size={22} />, 'Web Standards': <Globe size={22} />,
};

function SkillBar({ color, level, delay, inView }: { color: string; level: number; delay: number; inView: boolean }) {
  return (
    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden', marginTop: '0.6rem' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.5, delay: delay + 0.2, type: 'spring', stiffness: 50, damping: 15 }}
        style={{ height: '100%', background: `linear-gradient(to right, ${color}, ${color}dd)`, borderRadius: '10px', boxShadow: `0 0 10px ${color}44` }}
      />
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(getPortfolioData().skills);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handler = () => setSkills(getPortfolioData().skills);
    window.addEventListener('portfolioDataUpdated', handler);
    return () => window.removeEventListener('portfolioDataUpdated', handler);
  }, []);

  const categories = Array.from(new Set(skills.map(s => s.category)));
  let globalIndex = 0;

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          Core <span className="text-gradient">Skills</span>
        </motion.h2>
        <div className="skills-grid">
          {categories.map((cat, catIndex) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              className="glass"
              style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', opacity: 0.9, fontFamily: 'var(--font-outfit)', color: 'var(--accent-primary)' }}>
                {cat}
              </h3>
              {skills.filter(s => s.category === cat).map((skill) => {
                const delay = globalIndex * 0.05;
                globalIndex++;
                const icon = ICON_MAP[skill.name] ?? <Star size={22} />;
                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      style={{ color: skill.color, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', background: `${skill.color}15`, flexShrink: 0, border: `1px solid ${skill.color}33` }}
                    >
                      {icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.95rem', fontWeight: 600 }}>
                        <span>{skill.name}</span>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>{skill.level}%</span>
                      </div>
                      <SkillBar color={skill.color} level={skill.level} delay={delay} inView={inView} />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
