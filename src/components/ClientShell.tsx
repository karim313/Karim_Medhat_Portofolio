'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import CursorFollower from '@/components/CursorFollower';
import ScrollProgress from '@/components/ScrollProgress';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <CursorFollower />}
      {!isAdmin && <AnimatedBackground />}
      {!isAdmin && <Navbar />}
      <main style={isAdmin ? {} : { position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      {!isAdmin && (
        <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} Kareem Medhat. Built with Next.js &amp; Framer Motion.</p>
        </footer>
      )}
    </>
  );
}
