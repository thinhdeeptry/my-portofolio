import React from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '@/types/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gray-900/70 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="px-6 pb-6 flex justify-between items-center mt-auto">
        <a 
          href={project.liveUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-target"
        >
          <span>Live Demo</span>
          <ExternalLink size={16} />
        </a>
        
        <a 
          href={project.detailsUrl} 
          className="text-gray-300 hover:text-white flex items-center gap-1 transition-colors cursor-target"
        >
          <span>Details</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;