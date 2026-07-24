export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  features: string[];
  codeSnippet: string;
  category: 'Full Stack' | 'AI & Data' | 'Web Apps';
  gradient: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  verifyUrl: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; iconName?: string; highlight?: boolean }[];
}

export const RESUME_DATA = {
  personal: {
    name: "SOURABH",
    title: "Senior Frontend & AI Solutions Engineer",
    roles: [
      "Software Engineer",
      "MERN Stack Developer",
      "Python & ATS AI Architect",
      "Frontend Engineering Lead",
      "Generative AI Specialist"
    ],
    summary: "Computer Science graduate from VIT Bhopal with strong foundations in Python, Data Structures & Algorithms, SQL, Web Development, and Generative AI. Dedicated to engineering high-performance scalable web applications, real-time architectures, and AI-driven ATS score engines.",
    email: "sourabhsheoran695@gmail.com",
    phone: "+91 70564 26775",
    location: "Bhopal, India",
    linkedin: "https://www.linkedin.com/in/sourabh-sheoran-8173281a8/",
    github: "https://github.com/Sourabh-sheoran",
    status: "Available for Hire",
    stats: [
      { label: "ATS Score Accuracy", value: "98.5%" },
      { label: "MERN Apps Built", value: "10+" },
      { label: "Certifications Earned", value: "5" },
      { label: "Lighthouse Performance", value: "99/100" }
    ]
  },
  education: [
    {
      institution: "Vellore Institute of Technology (VIT), Bhopal",
      degree: "B.Tech in Computer Science & Engineering",
      period: "Sept 2022 – Sept 2026",
      grade: "Bachelor of Technology",
      description: "Specialized in Software Engineering, Data Structures & Algorithms, Database Management Systems, Computer Networks, and Operating Systems.",
      highlights: [
        "Core coursework in DSA, OOP, DBMS, OS, and Computer Networks",
        "Active member of Pahadi Club & Health-O-Tech event management team"
      ]
    }
  ],
  projects: [
    {
      id: "chatapp-mern",
      title: "ChatApp — Real-Time MERN Engine",
      subtitle: "Full-Stack Socket.IO Live Messaging Platform",
      description: "Full-stack real-time chat application powered by MongoDB, Express.js, React.js, Node.js, and Socket.IO with instant online presence and encrypted authentication.",
      longDescription: "Architected a responsive, high-throughput real-time communication platform utilizing WebSockets via Socket.IO. Features include JWT authentication stored in HTTP-only cookies, password hashing with bcrypt, Cloudinary CDN profile image uploads, live presence indicators, and seamless deployment on Render with MongoDB Atlas cloud database.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "JWT", "Cloudinary"],
      liveUrl: "https://chat-app-x430.onrender.com/",
      githubUrl: "https://github.com/Sourabh-sheoran",
      featured: true,
      category: "Full Stack",
      gradient: "from-cyan-500 via-indigo-500 to-purple-600",
      metrics: [
        { label: "Latency", value: "< 50ms" },
        { label: "Protocol", value: "WebSockets" },
        { label: "Auth", value: "JWT + Cookies" }
      ],
      features: [
        "Real-time bidirectional message streaming with Socket.IO",
        "Encrypted JWT authentication with HTTP-only cookie security",
        "Cloudinary API integration for profile image upload & optimization",
        "Online/offline status indicators and responsive DaisyUI UI",
        "Hosted on Render with cloud-based MongoDB Atlas cluster"
      ],
      codeSnippet: `// Socket.IO Real-Time Connection Handler
import { Server } from "socket.io";
const io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });

const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;
  
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});`
    },
    {
      id: "ats-resume-analyzer",
      title: "Smart Resume Skill Analyzer & ATS Score Checker",
      subtitle: "Python & Streamlit AI-Driven Resume Parsing Engine",
      description: "ATS Compatibility scoring engine using Python, Streamlit, Regex skill extraction, and Matplotlib visualizations for transparent candidate evaluation.",
      longDescription: "Engineered an ATS & Skill Analyzer web app using Streamlit and Python. It parses PDF resumes, computes weighted ATS compatibility scores (0-100), executes role-aware skill matching (Data Analyst, ML Engineer, Full Stack), recommends missing skills, and visualizes skill frequency matrices with Matplotlib.",
      tags: ["Python", "Streamlit", "Matplotlib", "Docker", "Regex NLP", "Data Analytics"],
      liveUrl: "https://smart-resume-skill-analyzer-ats-score-checker-avcsujymfsszn7tp.streamlit.app/Resources",
      githubUrl: "https://github.com/Sourabh-sheoran",
      featured: true,
      category: "AI & Data",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      metrics: [
        { label: "Parse Speed", value: "1.2s / PDF" },
        { label: "Score Engine", value: "Weighted ATS" },
        { label: "Container", value: "Docker Ready" }
      ],
      features: [
        "PDF text parsing and regex pattern matching against role skill databases",
        "Multi-metric scoring combining skill coverage, keyword density, and length",
        "Role-aware skill recommendations for Data Analyst, Data Scientist, ML Engineer",
        "Matplotlib visual analytics dashboard for frequency distribution",
        "Dockerized container setup for frictionless cloud execution"
      ],
      codeSnippet: `# ATS Skill Extraction & Weighting Engine
import re, pdfplumber
import matplotlib.pyplot as plt

def calculate_ats_score(resume_text, target_role_skills):
    extracted_skills = set(re.findall(r'\\b(' + '|'.join(target_role_skills) + r')\\b', resume_text, re.I))
    coverage_score = (len(extracted_skills) / len(target_role_skills)) * 100
    density_score = min(100, len(resume_text.split()) / 5.0)
    final_ats_score = round(0.7 * coverage_score + 0.3 * density_score, 2)
    return final_ats_score, extracted_skills`
    }
  ] as Project[],
  skills: [
    {
      title: "Programming & Core",
      icon: "Code2",
      skills: [
        { name: "Python", level: 92, highlight: true },
        { name: "JavaScript", level: 90, highlight: true },
        { name: "SQL", level: 88, highlight: true },
        { name: "C++ (Basic)", level: 75 },
        { name: "Machine Learning", level: 82 }
      ]
    },
    {
      title: "Frontend Engineering",
      icon: "Layout",
      skills: [
        { name: "React.js", level: 95, highlight: true },
        { name: "Next.js", level: 88, highlight: true },
        { name: "Tailwind CSS", level: 94, highlight: true },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "React Native", level: 80 }
      ]
    },
    {
      title: "Backend & Database",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 88, highlight: true },
        { name: "Express.js", level: 90, highlight: true },
        { name: "MongoDB", level: 86, highlight: true },
        { name: "MySQL", level: 85 },
        { name: "REST APIs", level: 92, highlight: true }
      ]
    },
    {
      title: "AI & Generative AI",
      icon: "Sparkles",
      skills: [
        { name: "Prompt Engineering", level: 94, highlight: true },
        { name: "LLMs & LangChain", level: 86, highlight: true },
        { name: "OpenAI API", level: 88, highlight: true },
        { name: "Google Gemini & Claude", level: 90 },
        { name: "Vector Databases", level: 80 }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: "Wrench",
      skills: [
        { name: "Git & GitHub", level: 92, highlight: true },
        { name: "Docker", level: 82 },
        { name: "VS Code & Jupyter", level: 95 },
        { name: "Postman", level: 90 },
        { name: "Streamlit & Matplotlib", level: 88 }
      ]
    }
  ] as SkillCategory[],
  certifications: [
    {
      id: "aws-architect",
      title: "AWS Academy Solution Architect",
      issuer: "Amazon Web Services (AWS)",
      date: "Certified",
      badge: "AWS Cloud",
      verifyUrl: "https://github.com/Sourabh-sheoran/Portfolio/blob/main/Certificates/aws%20certificate.pdf",
      skills: ["Cloud Architecture", "EC2", "S3", "AWS Infrastructure"]
    },
    {
      id: "ethnus-mern",
      title: "MERN Full Stack Development",
      issuer: "Ethnus",
      date: "Certified",
      badge: "Full Stack",
      verifyUrl: "https://github.com/Sourabh-sheoran/Portfolio/blob/main/Certificates/22BCE10695-MERN_FULL_STACK-ETHNUS-SCORECARD%202%202.pdf",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSockets"]
    },
    {
      id: "udemy-sql",
      title: "SQL for Data Analysts",
      issuer: "Udemy",
      date: "Certified",
      badge: "Database",
      verifyUrl: "https://www.udemy.com/certificate/UC-a30b8481-2006-4015-a4f2-b527eacbcd5d/",
      skills: ["SQL", "Complex Queries", "Data Analytics", "Join Optimization"]
    },
    {
      id: "udemy-nextjs",
      title: "Next.js Web Dev: Master React Framework",
      issuer: "Udemy",
      date: "Certified",
      badge: "Frontend Lead",
      verifyUrl: "https://www.udemy.com/certificate/UC-e8ac73a8-5ac9-46c7-9cf0-17271cdddf35/",
      skills: ["Next.js", "App Router", "SSR / SSG", "Server Actions"]
    },
    {
      id: "google-ai",
      title: "Google AI Suite — Fundamentals to App Building",
      issuer: "Google / Coursera",
      date: "Certified",
      badge: "GenAI Specialist",
      verifyUrl: "https://coursera.org/share/ee0beffd215e46179350ca9454f53425",
      skills: ["AI Fundamentals", "Prompting", "Research Insights", "AI App Building"]
    }
  ] as Certification[],
  activities: [
    {
      title: "Sponsorship Outreach & Marketing Campaign Lead",
      organization: "Pahadi Club",
      description: "Coordinated sponsorship outreach and developed marketing campaign materials to significantly increase engagement and brand visibility."
    },
    {
      title: "Event Logistics & On-site Operations Coordinator",
      organization: "Health-O-Tech",
      description: "Managed on-site operations and technical logistics for Health-O-Tech team events, ensuring successful execution and participant engagement."
    }
  ],
  languages: ["English", "Hindi"],
  interests: ["Technology Trends", "Music", "Open Source", "Algorithmic Problem Solving"]
};
