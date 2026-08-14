import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'server', 'data', 'db.json');

const initialProjects = [
  {
    id: "chatapp-mern",
    title: "ChatApp — Real-Time MERN Engine",
    subtitle: "Full-Stack Socket.IO Live Messaging Platform",
    description: "Full-stack real-time chat application powered by MongoDB, Express.js, React.js, Node.js, and Socket.IO with instant online presence and encrypted authentication.",
    longDescription: "Architected a responsive, high-throughput real-time communication platform utilizing WebSockets via Socket.IO. Features include JWT authentication stored in HTTP-only cookies, password hashing with bcrypt, Cloudinary CDN profile image uploads, live presence indicators, and seamless deployment on Render with MongoDB Atlas cloud database.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS", "JWT", "Cloudinary"],
    liveUrl: "https://chat-app-x430.onrender.com/",
    githubUrl: "https://github.com/Sourabh-sheoran",
    imageUrl: "",
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
    codeSnippet: `// Socket.IO Real-Time Connection Handler\nimport { Server } from "socket.io";\nconst io = new Server(server, { cors: { origin: process.env.CLIENT_URL } });\n\nconst userSocketMap = {}; // { userId: socketId }\n\nio.on("connection", (socket) => {\n  const userId = socket.handshake.query.userId;\n  if (userId) userSocketMap[userId] = socket.id;\n  \n  io.emit("getOnlineUsers", Object.keys(userSocketMap));\n\n  socket.on("disconnect", () => {\n    delete userSocketMap[userId];\n    io.emit("getOnlineUsers", Object.keys(userSocketMap));\n  });\n});`
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
    imageUrl: "",
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
    codeSnippet: `# ATS Skill Extraction & Weighting Engine\nimport re, pdfplumber\nimport matplotlib.pyplot as plt\n\ndef calculate_ats_score(resume_text, target_role_skills):\n    extracted_skills = set(re.findall(r'\\b(' + '|'.join(target_role_skills) + r')\\b', resume_text, re.I))\n    coverage_score = (len(extracted_skills) / len(target_role_skills)) * 100\n    density_score = min(100, len(resume_text.split()) / 5.0)\n    final_ats_score = round(0.7 * coverage_score + 0.3 * density_score, 2)\n    return final_ats_score, extracted_skills`
  }
];

export const getDbData = () => {
  if (!fs.existsSync(dbPath)) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const defaultData = {
      admin: {
        email: process.env.ADMIN_EMAIL || 'sourabhsheoran695@gmail.com',
        // default fallback bcrypt hash for password "admin123" if not seeded yet
        passwordHash: '$2a$10$wU.a5XQhU1d2R7d2a5S0.O/P91s0bW2rLzZ9P0eQ.2k/8xM9o.O2u'
      },
      content: {
        profilePicUrl: '/sourabh.jpg',
        resumeUrl: 'https://github.com/Sourabh-sheoran/Portfolio',
        projects: initialProjects
      }
    };
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }

  try {
    const content = fs.readFileSync(dbPath, 'utf8');
    const parsed = JSON.parse(content);
    if (!parsed.messages) parsed.messages = [];
    return parsed;
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {
      admin: {},
      content: { profilePicUrl: '/sourabh.jpg', resumeUrl: '', projects: [] },
      messages: []
    };
  }
};

export const saveDbData = (data) => {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
