import React from 'react';
import { useTechStack } from '@/hooks/useProjects';
import TechCard from './TechCard';
import { motion } from 'framer-motion';

const TechStackSection: React.FC = () => {
  const { techStack, isLoading, error } = useTechStack();

  if (isLoading) return <div className="text-center py-12 text-gray-400">Loading tech stack...</div>;
  if (error) return <div className="text-center py-12 text-red-400">Error loading tech stack: {error.message}</div>;

  return (

    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
        >
          <TechCard tech={tech} key={tech.id}/>
        </motion.div>
      ))}
    </motion.div>

  );
};

export default TechStackSection;