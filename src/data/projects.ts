/**
 * CENTRALIZED PROJECT DATA (Verified Live Deployments)
 * 
 * Order is strictly maintained from 01 to 09 as requested.
 * All screenshots have been verified and saved into /projects/*.webp.
 */

export interface StackedProject {
  id: string;
  index: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  caseStudyUrl?: string | null;
  status?: string;
  badge?: string;
}

export const stackedProjects: StackedProject[] = [
  {
    id: "01",
    index: 1,
    title: "AIBASS – AI Accounting Software",
    category: "AI Accounting / FinTech",
    description: "Enterprise-grade AI accounting and automated billing engine built for Indian businesses, featuring smart ledger reconciliation, GST-compliant invoicing, and real-time financial health intelligence.",
    technologies: [
      "AI Accounting",
      "GST Billing Engine",
      "Financial Ledgers",
      "Enterprise SaaS"
    ],
    image: "/projects/project-01-aibass.webp",
    liveUrl: "https://software.saaiss.in/",
    caseStudyUrl: null,
    status: "live",
    badge: "Production AI FinTech",
  },
  {
    id: "02",
    index: 2,
    title: "Halal Medi",
    category: "Healthcare / Medical Platform",
    description: "Secure healthcare gateway connecting international patients with verified medical facilities in India, featuring end-to-end encrypted consultations, hospital onboarding, and coordinated care pathways.",
    technologies: [
      "Next.js",
      "Patient Gateway",
      "Encrypted Access",
      "Hospital Portals"
    ],
    image: "/projects/project-02-halal-medi.webp",
    liveUrl: "https://halal-website-main.vercel.app/login",
    caseStudyUrl: null,
    status: "live",
    badge: "Active Healthcare Gateway",
  },
  {
    id: "03",
    index: 3,
    title: "Halal Medical – Super Admin",
    category: "Healthcare / Admin Dashboard",
    description: "Central command and super-admin orchestration layer for managing multi-facility hospital operations, medical coordinator credentials, patient queues, and compliance governance across institutions.",
    technologies: [
      "Super-Admin Layer",
      "Multi-Facility Mgmt",
      "Access Governance",
      "Audit Telemetry"
    ],
    image: "/projects/project-03-halal-super-admin.webp",
    liveUrl: "https://halal-super-admin-main.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "Central Control Layer",
  },
  {
    id: "04",
    index: 4,
    title: "AdvocateCaseOS",
    category: "Legal Technology / Case Management",
    description: "Modern legal operations dashboard and case intelligence platform engineered for legal practitioners to streamline courtroom schedules, client dockets, case files, and legal documentation.",
    technologies: [
      "Legal Tech OS",
      "Case Management",
      "Court Docket Sync",
      "Document Indexing"
    ],
    image: "/projects/project-04-advocatecaseos.webp",
    liveUrl: "https://advocatecasehub-main-main.vercel.app/login",
    caseStudyUrl: null,
    status: "live",
    badge: "Legal Operations Platform",
  },
  {
    id: "05",
    index: 5,
    title: "BeltForge",
    category: "Industrial AI / Predictive Maintenance",
    description: "Industrial IoT monitoring and predictive failure diagnostics control room engineered for NMDC smart mining operations, tracking conveyor belt joint integrity and real-time fleet health.",
    technologies: [
      "Industrial IoT",
      "Predictive Diagnostics",
      "Edge Telemetry",
      "NMDC Mining Ops"
    ],
    image: "/projects/project-05-beltforge.webp",
    liveUrl: "https://beltforge.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "Industrial AI Control Room",
  },
  {
    id: "06",
    index: 6,
    title: "RailSync",
    category: "Logistics / AI Freight Booking",
    description: "Conversational AI freight booking and dispatch platform featuring real-time carrier matching across 42+ routes, smart slot scheduling, and telemetry shipment tracking for high-throughput logistics.",
    technologies: [
      "Conversational AI",
      "Smart Freight Routing",
      "Slot Scheduling",
      "Real-time Telemetry"
    ],
    image: "/projects/project-06-railsync.webp",
    liveUrl: "https://web-shipper-main.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "AI Freight Dispatch Engine",
  },
  {
    id: "07",
    index: 7,
    title: "Halal Medical – Web User",
    category: "Healthcare / Medical Tourism",
    description: "Global patient-facing medical tourism portal facilitating specialized care inquiries, doctor consultations, multi-language support, and hospital discovery for international patients seeking treatment in India.",
    technologies: [
      "Medical Tourism Portal",
      "Multi-Language Care",
      "Hospital Discovery",
      "Patient Inquiry Flow"
    ],
    image: "/projects/project-07-halal-medical-webuser.webp",
    liveUrl: "https://halal-medical-webuser.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "Patient-Facing Portal",
  },
  {
    id: "08",
    index: 8,
    title: "Connect Care",
    category: "Healthcare / Medical Platform",
    description: "Comprehensive patient health management portal (MediCare+) featuring verified doctor discovery, video teleconsultations, instant lab report uploads, and digital prescription coordination.",
    technologies: [
      "Patient Portal",
      "Teleconsultations",
      "Doctor Discovery",
      "Lab Diagnostics Sync"
    ],
    image: "/projects/project-08-connect-care.webp",
    liveUrl: "https://medical-new-rose.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "Telehealth Platform",
  },
  {
    id: "09",
    index: 9,
    title: "Halal Health Hub",
    category: "Healthcare / Multi-Portal Platform",
    description: "Unified healthcare coordination system centralizing hospital administrative portals, on-demand doctor availability, and end-to-end patient care coordination across specialized facilities.",
    technologies: [
      "Healthcare Coordination",
      "Multi-Portal Platform",
      "Doctor Scheduling",
      "Facility Federation"
    ],
    image: "/projects/project-09-halal-health-hub.webp",
    liveUrl: "https://halal-portals.vercel.app/",
    caseStudyUrl: null,
    status: "live",
    badge: "Unified Healthcare System",
  },
];
