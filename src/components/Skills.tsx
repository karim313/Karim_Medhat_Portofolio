'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Layers,
  Cpu,
  Globe,
  Smartphone,
  Zap,
  Frame,
  Palette,
  GitBranch,
  PenTool,
  Server,
  Terminal,
  Workflow
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <Code2 size={22} />, color: '#61DAFB', level: 90 },
      { name: 'Next.js', icon: <Layers size={22} />, color: '#ffffff', level: 85 },
      { name: 'TypeScript', icon: <Cpu size={22} />, color: '#3178C6', level: 88 },
      { name: 'Framer Motion', icon: <Frame size={22} />, color: '#E10098', level: 82 },
      { name: 'Tailwind CSS', icon: <Zap size={22} />, color: '#38BDF8', level: 90 },
    ]
  },
  {
    title: 'Tools & Workflow',
    skills: [
      { name: 'Git & GitHub', icon: <GitBranch size={22} />, color: '#F05032', level: 80 },
      { name: 'REST APIs', icon: <Server size={22} />, color: '#4CAF50', level: 78 },
      { name: 'CI/CD', icon: <Workflow size={22} />, color: '#FF9800', level: 70 },
      { name: 'CLI & Scripts', icon: <Terminal size={22} />, color: '#A3E635', level: 75 },
    ]
  },
  {
    title: 'Design & UX',
    skills: [
      { name: 'UI/UX Design', icon: <Palette size={22} />, color: '#FF61F6', level: 85 },
      { name: 'Figma', icon: <PenTool size={22} />, color: '#F24E1E', level: 80 },
      { name: 'Responsive', icon: <Smartphone size={22} />, color: '#FF5722', level: 92 },
      { name: 'Web Standards', icon: <Globe size={22} />, color: '#4CAF50', level: 88 },
    ]
  }
];

function SkillBar({ color, level, delay, inView }: { color: string; level: number; delay: number; inView: boolean }) {
  return (
    <div style={{
      width: '100%',
      height: '6px',
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '10px',
      overflow: 'hidden',
      marginTop: '0.6rem'
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ 
          duration: 1.5, 
          delay: delay + 0.2, 
          type: 'spring', 
          stiffness: 50, 
          damping: 15 
        }}
        style={{
          height: '100%',
          background: `linear-gradient(to right, ${color}, ${color}dd)`,
          borderRadius: '10px',
          boxShadow: `0 0 10px ${color}44`
        }}
      />
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.1 }}
              className="glass"
              style={{
                padding: '2rem',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                opacity: 0.9,
                fontFamily: 'var(--font-outfit)',
                color: 'var(--accent-primary)'
              }}>
                {category.title}
              </h3>

              {category.skills.map((skill) => {
                const delay = globalIndex * 0.05;
                globalIndex++;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: delay + 0.2, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      style={{
                        color: skill.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: `${skill.color}15`,
                        flexShrink: 0,
                        border: `1px solid ${skill.color}33`
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                      }}>
                        <span>{skill.name}</span>
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.6,
                          fontWeight: 700,
                          fontFamily: 'var(--font-outfit)',
                        }}>
                          {skill.level}%
                        </span>
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
