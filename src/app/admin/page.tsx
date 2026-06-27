'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('@/components/admin/AdminDashboard'), { ssr: false });

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') setAuthed(true);
    setChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      setAuthed(true);
    } else {
      setError('Incorrect password. Try again.');
      setPw('');
    }
  };

  if (checking) return null;

  if (authed) return <AdminDashboard />;

  return (
    <div className="admin-login-page">
      <div className="admin-login-card glass">
        <div className="admin-login-icon">⚙️</div>
        <h1 className="admin-login-title">Admin Access</h1>
        <p className="admin-login-sub">Enter your password to manage the portfolio</p>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(''); }}
            placeholder="Password"
            className="admin-login-input"
            autoFocus
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-btn bg-gradient">
            Unlock Dashboard
          </button>
        </form>
        <a href="/" className="admin-back-link">← Back to Portfolio</a>
      </div>
    </div>
  );
}
