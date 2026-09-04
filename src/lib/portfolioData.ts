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
  github?: string;
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
      { label: "Learning", value: "3+ Years" },
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
      title: "Al-Shakhs Trading",
      description: "Corporate trading website engineered for speed and trust. Built with React and Vite for instant HMR and lightning-fast builds.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      link: "https://alshakhs-trading.vercel.app/",
      github: "https://github.com/karim313/alshakhs_trading",
      tags: ["React", "Vite", "Trading"],
    },
    {
      id: "p2",
      title: "Roqayya",
      description: "A modern web application offering a responsive and clean user interface.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
      link: "https://roqayya-y19h.vercel.app/",
      github: "https://github.com/karim313/roqayya",
      tags: ["Web App", "Responsive", "Modern UI"],
    },
    {
      id: "p3",
      title: "Match Hire — AI Recruitment",
      description: "An AI-powered recruitment platform designed to match candidates with the best job opportunities.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      link: "https://match-hire-vt98.vercel.app/",
      github: "https://github.com/karim313/Match_Hire",
      tags: ["AI", "Recruitment", "Platform"],
    },
    {
      id: "p4",
      title: "Law System Management — MCP",
      description: "Law System Management server integration with MCP for streamlined firm operations.",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop",
      link: "https://law-systeme-management-mcp-q6hv-six.vercel.app/",
      github: "https://github.com/karim313/law-systeme-management-mcp",
      tags: ["MCP", "Management", "System"],
    },
    {
      id: "p5",
      title: "My Prof Store",
      description: "A comprehensive E-Commerce Platform for a customized shopping experience.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
      link: "https://my-prof-store-fqk9.vercel.app/",
      github: "https://github.com/karim313/myProfStore",
      tags: ["E-Commerce", "Store", "Shopping"],
    },
    {
      id: "p6",
      title: "Education Platform",
      description: "An education platform frontend combined with a detailed management dashboard.",
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1000&auto=format&fit=crop",
      link: "https://eduplatform-front-end.vercel.app/",
      github: "https://github.com/karim313/eduplatformFrontEnd",
      tags: ["Education", "Platform", "Dashboard"],
    },
    {
      id: "p7",
      title: "Graduation Project — E-Commerce",
      description: "A complete end-to-end E-Commerce store developed as a graduation project.",
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
      link: "https://ecommerce-store.vercel.app",
      github: "https://github.com/karim313/E-commerce",
      tags: ["Graduation", "E-Commerce", "Full Stack"],
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
