'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Phone, Mail } from 'lucide-react';
import { getPortfolioData, ContactData } from '@/lib/portfolioData';

export default function Contact() {
  const [contact, setContact] = useState<ContactData>(getPortfolioData().contact);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handler = () => setContact(getPortfolioData().contact);
    window.addEventListener('portfolioDataUpdated', handler);
    return () => window.removeEventListener('portfolioDataUpdated', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <h2 style={{ marginBottom: '2rem' }}>
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p style={{ opacity: 0.7, marginBottom: '3rem', fontSize: '1.1rem' }}>{contact.tagline}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="glass" style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Phone &amp; WhatsApp</div>
                  <div style={{ fontWeight: 600 }}>{contact.phone}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="glass" style={{ width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Email</div>
                  <div style={{ fontWeight: 600 }}>{contact.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem)', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {formState !== 'success' ? (
                <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0, scale: 0.95 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', opacity: 0.8 }}>Name</label>
                    <input required type="text" className="contact-input" placeholder="Your Name" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', opacity: 0.8 }}>Email</label>
                    <input required type="email" className="contact-input" placeholder="Your Email" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', opacity: 0.8 }}>Message</label>
                    <textarea required className="contact-input" rows={4} placeholder="Your Message" style={{ resize: 'none' }} />
                  </div>
                  <button
                    disabled={formState === 'submitting'}
                    className="bg-gradient"
                    style={{ padding: '1rem', borderRadius: '15px', fontWeight: 700, marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: formState === 'submitting' ? 0.7 : 1, border: 'none', color: 'white', cursor: 'pointer' }}
                  >
                    {formState === 'submitting' ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10 }} style={{ color: '#10B981', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <CheckCircle size={80} />
                  </motion.div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Message Sent!</h3>
                  <p style={{ opacity: 0.7 }}>Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
                  <button onClick={() => setFormState('idle')} style={{ marginTop: '2rem', background: 'none', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1.5rem', borderRadius: '50px', color: 'white', cursor: 'pointer' }}>
                    Send Another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
