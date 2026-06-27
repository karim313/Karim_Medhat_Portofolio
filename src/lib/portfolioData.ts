// ─── Portfolio Data Store ───────────────────────────────────────────────────
// This file defines the shape of all portfolio data and provides a simple
// localStorage-backed store so the Admin page can update content that is then
// read by every component on the public site.

export interface HeroData {
  name: string;
  greeting: string;
  heading: string;
  headingHighlight: string;
  roles: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryHref: string;
  ctaSecondaryHref: string;
}

export interface AboutData {
  bio1: string;
  bio2: string;
  stats: { label: string; value: string }[];
}

export interface Skill {
  id: string;
  name: string;
  color: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export interface ContactData {
  phone: string;
  email: string;
  tagline: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: Skill[];
  projects: Project[];
  contact: ContactData;
}

// ─── Default / seed data ────────────────────────────────────────────────────
export const defaultData: PortfolioData = {
  hero: {
    name: "Kareem Medhat",
    greeting: "Hi, I'm Kareem Medhat",
    heading: "Creative",
    headingHighlight: "Developer",
    roles: [
      "Front-End Developer",
      "React & Next.js Specialist",
      "Building High-Performance Web Apps",
    ],
    ctaPrimary: "View Work",
    ctaSecondary: "Contact Me",
    ctaPrimaryHref: "#projects",
    ctaSecondaryHref: "#contact",
  },
  about: {
    bio1: `I am a passionate Front-End Developer with a focus on creating highly interactive,
premium web experiences. My expertise lies in React and Next.js, where I blend logic with
creativity to build performant and visually stunning applications.`,
    bio2: `I believe that performance and aesthetics should go hand in hand. Every animation I build
is GPU-accelerated and optimized to ensure a 60fps experience for the user. My goal is
to push the boundaries of what's possible on the web while maintaining accessibility
and speed.`,
    stats: [
      { label: "Experience", value: "2+ Years" },
      { label: "Projects", value: "15+ Completed" },
      { label: "Location", value: "Egypt" },
    ],
  },
  skills: [
    { id: "s1", name: "React", color: "#61DAFB", level: 90, category: "Frontend" },
    { id: "s2", name: "Next.js", color: "#ffffff", level: 85, category: "Frontend" },
    { id: "s3", name: "TypeScript", color: "#3178C6", level: 88, category: "Frontend" },
    { id: "s4", name: "Framer Motion", color: "#E10098", level: 82, category: "Frontend" },
    { id: "s5", name: "Tailwind CSS", color: "#38BDF8", level: 90, category: "Frontend" },
    { id: "s6", name: "Git & GitHub", color: "#F05032", level: 80, category: "Tools & Workflow" },
    { id: "s7", name: "REST APIs", color: "#4CAF50", level: 78, category: "Tools & Workflow" },
    { id: "s8", name: "CI/CD", color: "#FF9800", level: 70, category: "Tools & Workflow" },
    { id: "s9", name: "CLI & Scripts", color: "#A3E635", level: 75, category: "Tools & Workflow" },
    { id: "s10", name: "UI/UX Design", color: "#FF61F6", level: 85, category: "Design & UX" },
    { id: "s11", name: "Figma", color: "#F24E1E", level: 80, category: "Design & UX" },
    { id: "s12", name: "Responsive", color: "#FF5722", level: 92, category: "Design & UX" },
    { id: "s13", name: "Web Standards", color: "#4CAF50", level: 88, category: "Design & UX" },
  ],
  projects: [
    {
      id: "p1",
      title: "Premium E-Commerce",
      description:
        "A high-performance e-commerce platform built with Next.js 14, featuring server-side rendering for SEO, optimized cart state management with Zustand, and silky-smooth page transitions powered by Framer Motion. Achieved a 98 Lighthouse performance score.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
      link: "https://e-commerce-five-tawny-65.vercel.app",
      tags: ["Next.js", "Tailwind", "Framer Motion", "Zustand"],
    },
    {
      id: "p2",
      title: "Al-Shakhs Trading",
      description:
        "Corporate trading website engineered for speed and trust. Built with React and Vite for instant HMR and lightning-fast builds. Uses CSS Modules for scoped styling, custom scroll animations, and responsive data tables for real-time commodity listings.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      link: "https://alshakhs-trading.vercel.app",
      tags: ["React", "Vite", "CSS Modules", "Responsive"],
    },
    {
      id: "p3",
      title: "Portfolio V2",
      description:
        "An earlier iteration of this portfolio showcasing advanced canvas animations, WebGL particle effects, and a fully custom design system. Served as the testing ground for gesture-based interactions and scroll-driven storytelling.",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      link: "#",
      tags: ["React", "Canvas API", "GSAP", "WebGL"],
    },
    {
      id: "p4",
      title: "Fake Portfolio",
      description:
        "A visually striking personal portfolio crafted with Next.js and Framer Motion, featuring an interactive gradient mesh background, custom spring-physics cursor, scroll progress tracking, parallax hero with typing animation, and staggered entrance animations throughout.",
      image:
        "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
      link: "https://fake-portofolio.vercel.app",
      tags: ["Next.js", "Framer Motion", "CSS Variables", "Responsive"],
    },
  ],
  contact: {
    phone: "01113067398",
    email: "kareemmedhat03@gmail.com",
    tagline:
      "I'm always open to discussing new projects, creative ideas or original opportunities to be part of your visions.",
  },
};

// ─── Storage helpers ─────────────────────────────────────────────────────────
const STORAGE_KEY = "portfolio_admin_data";

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch {
    return defaultData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch a custom event so any open tabs can react
  window.dispatchEvent(new Event("portfolioDataUpdated"));
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("portfolioDataUpdated"));
}
