'use client';

import { useState, useEffect, useCallback } from 'react';
import { getPortfolioData, savePortfolioData, resetPortfolioData, defaultData, PortfolioData, Project, Skill } from '@/lib/portfolioData';
import { nanoid } from 'nanoid';

type Tab = 'hero' | 'about' | 'skills' | 'projects' | 'contact';

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('hero');
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [saved, setSaved] = useState(false);
  const [logout, setLogout] = useState(false);

  useEffect(() => { setData(getPortfolioData()); }, []);

  const handleSave = useCallback(() => {
    savePortfolioData(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [data]);

  const handleReset = () => {
    if (confirm('Reset ALL portfolio data to defaults?')) {
      resetPortfolioData();
      setData(defaultData);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setLogout(true);
    window.location.href = '/';
  };

  // ─── Hero helpers ──────────────────────────────────────────────────────────
  const updateHero = (key: string, val: string) =>
    setData(d => ({ ...d, hero: { ...d.hero, [key]: val } }));

  const updateRoles = (val: string) =>
    setData(d => ({ ...d, hero: { ...d.hero, roles: val.split('\n') } }));

  // ─── About helpers ─────────────────────────────────────────────────────────
  const updateAbout = (key: string, val: string) =>
    setData(d => ({ ...d, about: { ...d.about, [key]: val } }));

  const updateStat = (i: number, key: 'label' | 'value', val: string) =>
    setData(d => {
      const stats = [...d.about.stats];
      stats[i] = { ...stats[i], [key]: val };
      return { ...d, about: { ...d.about, stats } };
    });

  const addStat = () =>
    setData(d => ({ ...d, about: { ...d.about, stats: [...d.about.stats, { label: 'New Stat', value: '0' }] } }));

  const removeStat = (i: number) =>
    setData(d => ({ ...d, about: { ...d.about, stats: d.about.stats.filter((_, idx) => idx !== i) } }));

  // ─── Skills helpers ────────────────────────────────────────────────────────
  const updateSkill = (id: string, key: keyof Skill, val: string | number) =>
    setData(d => ({ ...d, skills: d.skills.map(s => s.id === id ? { ...s, [key]: val } : s) }));

  const addSkill = () =>
    setData(d => ({ ...d, skills: [...d.skills, { id: nanoid(), name: 'New Skill', color: '#8b5cf6', level: 80, category: 'Frontend' }] }));

  const removeSkill = (id: string) =>
    setData(d => ({ ...d, skills: d.skills.filter(s => s.id !== id) }));

  // ─── Projects helpers ──────────────────────────────────────────────────────
  const updateProject = (id: string, key: keyof Project, val: string | string[]) =>
    setData(d => ({ ...d, projects: d.projects.map(p => p.id === id ? { ...p, [key]: val } : p) }));

  const addProject = () =>
    setData(d => ({ ...d, projects: [...d.projects, { id: nanoid(), title: 'New Project', description: '', image: '', link: '#', tags: [] }] }));

  const removeProject = (id: string) =>
    setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id) }));

  // ─── Contact helpers ───────────────────────────────────────────────────────
  const updateContact = (key: string, val: string) =>
    setData(d => ({ ...d, contact: { ...d.contact, [key]: val } }));

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'hero', label: 'Hero', icon: '🦸' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🗂️' },
    { id: 'contact', label: 'Contact', icon: '📬' },
  ];

  if (logout) return <div className="admin-loading">Logging out…</div>;

  return (
    <div className="admin-shell">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar glass">
        <div className="admin-sidebar-brand">
          <span className="admin-brand-icon">⚙️</span>
          <span className="admin-brand-text">Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`admin-nav-item${tab === t.id ? ' admin-nav-item--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="admin-nav-icon">{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" className="admin-sidebar-link">🌐 View Site</a>
          <button onClick={handleReset} className="admin-sidebar-link admin-sidebar-link--danger">🔄 Reset All</button>
          <button onClick={handleLogout} className="admin-sidebar-link admin-sidebar-link--logout">🚪 Logout</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <div className="admin-main-header">
          <div>
            <h1 className="admin-main-title">{tabs.find(t => t.id === tab)?.icon} {tabs.find(t => t.id === tab)?.label}</h1>
            <p className="admin-main-sub">Edit your portfolio {tab} section</p>
          </div>
          <button onClick={handleSave} className={`admin-save-btn bg-gradient${saved ? ' admin-save-btn--saved' : ''}`}>
            {saved ? '✅ Saved!' : '💾 Save Changes'}
          </button>
        </div>

        <div className="admin-content">
          {tab === 'hero' && <HeroEditor data={data} updateHero={updateHero} updateRoles={updateRoles} />}
          {tab === 'about' && <AboutEditor data={data} updateAbout={updateAbout} updateStat={updateStat} addStat={addStat} removeStat={removeStat} />}
          {tab === 'skills' && <SkillsEditor data={data} updateSkill={updateSkill} addSkill={addSkill} removeSkill={removeSkill} />}
          {tab === 'projects' && <ProjectsEditor data={data} updateProject={updateProject} addProject={addProject} removeProject={removeProject} />}
          {tab === 'contact' && <ContactEditor data={data} updateContact={updateContact} />}
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Sub-Editors
// ═══════════════════════════════════════════════════════════════════════════

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {children}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
function HeroEditor({ data, updateHero, updateRoles }: {
  data: PortfolioData;
  updateHero: (k: string, v: string) => void;
  updateRoles: (v: string) => void;
}) {
  const h = data.hero;
  return (
    <div className="admin-grid-2">
      <Field label="Greeting Line"><input className="admin-input" value={h.greeting} onChange={e => updateHero('greeting', e.target.value)} /></Field>
      <Field label="Name"><input className="admin-input" value={h.name} onChange={e => updateHero('name', e.target.value)} /></Field>
      <Field label="Heading Word"><input className="admin-input" value={h.heading} onChange={e => updateHero('heading', e.target.value)} /></Field>
      <Field label="Highlighted Word"><input className="admin-input" value={h.headingHighlight} onChange={e => updateHero('headingHighlight', e.target.value)} /></Field>
      <Field label="CTA Primary Text"><input className="admin-input" value={h.ctaPrimary} onChange={e => updateHero('ctaPrimary', e.target.value)} /></Field>
      <Field label="CTA Primary Href"><input className="admin-input" value={h.ctaPrimaryHref} onChange={e => updateHero('ctaPrimaryHref', e.target.value)} /></Field>
      <Field label="CTA Secondary Text"><input className="admin-input" value={h.ctaSecondary} onChange={e => updateHero('ctaSecondary', e.target.value)} /></Field>
      <Field label="CTA Secondary Href"><input className="admin-input" value={h.ctaSecondaryHref} onChange={e => updateHero('ctaSecondaryHref', e.target.value)} /></Field>
      <div className="admin-full">
        <Field label="Typing Roles (one per line)">
          <textarea className="admin-input admin-textarea" rows={4} value={h.roles.join('\n')} onChange={e => updateRoles(e.target.value)} />
        </Field>
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────
function AboutEditor({ data, updateAbout, updateStat, addStat, removeStat }: {
  data: PortfolioData;
  updateAbout: (k: string, v: string) => void;
  updateStat: (i: number, k: 'label' | 'value', v: string) => void;
  addStat: () => void;
  removeStat: (i: number) => void;
}) {
  const a = data.about;
  return (
    <div className="admin-stack">
      <Field label="Bio Paragraph 1">
        <textarea className="admin-input admin-textarea" rows={4} value={a.bio1} onChange={e => updateAbout('bio1', e.target.value)} />
      </Field>
      <Field label="Bio Paragraph 2">
        <textarea className="admin-input admin-textarea" rows={4} value={a.bio2} onChange={e => updateAbout('bio2', e.target.value)} />
      </Field>
      <div>
        <div className="admin-section-header">
          <label className="admin-label">Stats Cards</label>
          <button className="admin-add-btn" onClick={addStat}>+ Add Stat</button>
        </div>
        <div className="admin-grid-3">
          {a.stats.map((s, i) => (
            <div key={i} className="admin-card glass">
              <div className="admin-card-header">
                <span className="admin-card-num">#{i + 1}</span>
                <button className="admin-remove-btn" onClick={() => removeStat(i)}>✕</button>
              </div>
              <Field label="Label"><input className="admin-input" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} /></Field>
              <Field label="Value"><input className="admin-input" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} /></Field>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────
const SKILL_CATEGORIES = ['Frontend', 'Tools & Workflow', 'Design & UX'];

function SkillsEditor({ data, updateSkill, addSkill, removeSkill }: {
  data: PortfolioData;
  updateSkill: (id: string, k: keyof Skill, v: string | number) => void;
  addSkill: () => void;
  removeSkill: (id: string) => void;
}) {
  return (
    <div className="admin-stack">
      <div className="admin-section-header">
        <span className="admin-label">{data.skills.length} Skills</span>
        <button className="admin-add-btn" onClick={addSkill}>+ Add Skill</button>
      </div>
      {SKILL_CATEGORIES.map(cat => (
        <div key={cat}>
          <h3 className="admin-cat-title">{cat}</h3>
          <div className="admin-skills-list">
            {data.skills.filter(s => s.category === cat).map(skill => (
              <div key={skill.id} className="admin-skill-row glass">
                <input className="admin-input admin-input--sm" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} placeholder="Skill name" />
                <div className="admin-skill-color-wrap">
                  <input type="color" className="admin-color-input" value={skill.color} onChange={e => updateSkill(skill.id, 'color', e.target.value)} />
                  <span className="admin-color-label">{skill.color}</span>
                </div>
                <div className="admin-skill-level-wrap">
                  <input type="range" min={0} max={100} value={skill.level} onChange={e => updateSkill(skill.id, 'level', +e.target.value)} className="admin-range" />
                  <span className="admin-level-num">{skill.level}%</span>
                </div>
                <select className="admin-input admin-input--sm" value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)}>
                  {SKILL_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <button className="admin-remove-btn" onClick={() => removeSkill(skill.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────
function ProjectsEditor({ data, updateProject, addProject, removeProject }: {
  data: PortfolioData;
  updateProject: (id: string, k: keyof Project, v: string | string[]) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
}) {
  return (
    <div className="admin-stack">
      <div className="admin-section-header">
        <span className="admin-label">{data.projects.length} Projects</span>
        <button className="admin-add-btn" onClick={addProject}>+ Add Project</button>
      </div>
      {data.projects.map((p, i) => (
        <div key={p.id} className="admin-card glass">
          <div className="admin-card-header">
            <span className="admin-card-num">Project #{i + 1}</span>
            <button className="admin-remove-btn" onClick={() => removeProject(p.id)}>✕ Remove</button>
          </div>
          <div className="admin-grid-2">
            <Field label="Title"><input className="admin-input" value={p.title} onChange={e => updateProject(p.id, 'title', e.target.value)} /></Field>
            <Field label="Live URL"><input className="admin-input" value={p.link} onChange={e => updateProject(p.id, 'link', e.target.value)} /></Field>
            <div className="admin-full">
              <Field label="Image URL">
                <input className="admin-input" value={p.image} onChange={e => updateProject(p.id, 'image', e.target.value)} placeholder="https://..." />
              </Field>
            </div>
            <div className="admin-full">
              <Field label="Description">
                <textarea className="admin-input admin-textarea" rows={3} value={p.description} onChange={e => updateProject(p.id, 'description', e.target.value)} />
              </Field>
            </div>
            <div className="admin-full">
              <Field label="Tags (comma-separated)">
                <input className="admin-input" value={p.tags.join(', ')} onChange={e => updateProject(p.id, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} />
              </Field>
            </div>
          </div>
          {p.image && (
            <div className="admin-preview-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title} className="admin-preview-img" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────
function ContactEditor({ data, updateContact }: {
  data: PortfolioData;
  updateContact: (k: string, v: string) => void;
}) {
  const c = data.contact;
  return (
    <div className="admin-grid-2">
      <Field label="Phone / WhatsApp"><input className="admin-input" value={c.phone} onChange={e => updateContact('phone', e.target.value)} /></Field>
      <Field label="Email"><input className="admin-input" type="email" value={c.email} onChange={e => updateContact('email', e.target.value)} /></Field>
      <div className="admin-full">
        <Field label="Tagline / Description">
          <textarea className="admin-input admin-textarea" rows={3} value={c.tagline} onChange={e => updateContact('tagline', e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
