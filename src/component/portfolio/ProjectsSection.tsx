import React from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const ProjectsSection: React.FC = () => {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <div className="text-center py-12 text-gray-400">Loading projects...</div>;
  if (error) return <div className="text-center py-12 text-red-400">Error loading projects: {error.message}</div>;

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
        >
          <ProjectCard project={project} key={project.id} />
        </motion.div>
      ))}
    </motion.div>

  );
};

export default ProjectsSection;