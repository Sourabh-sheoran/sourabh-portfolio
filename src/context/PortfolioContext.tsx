import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESUME_DATA, type Project } from '../data/resumeData';

interface PortfolioContextType {
  profilePicUrl: string;
  resumeUrl: string;
  projects: Project[];
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({
  profilePicUrl: '/sourabh.jpg',
  resumeUrl: 'https://github.com/Sourabh-sheoran/Portfolio',
  projects: RESUME_DATA.projects,
  loading: false,
  refreshContent: async () => {}
});

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string>('/sourabh.jpg');
  const [resumeUrl, setResumeUrl] = useState<string>('https://github.com/Sourabh-sheoran/Portfolio');
  const [projects, setProjects] = useState<Project[]>(RESUME_DATA.projects);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContent = async () => {
    try {
      let res;
      try {
        res = await fetch('/api/content');
      } catch (e) {
        res = await fetch('http://localhost:5001/api/content');
      }

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data.profilePicUrl) setProfilePicUrl(data.profilePicUrl);
          if (data.resumeUrl) setResumeUrl(data.resumeUrl);
          if (Array.isArray(data.projects) && data.projects.length > 0) {
            setProjects(data.projects);
          }
        }
      }
    } catch (err) {
      console.warn('Backend API offline or unreachable, using static fallback content.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        profilePicUrl,
        resumeUrl,
        projects,
        loading,
        refreshContent: fetchContent
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
