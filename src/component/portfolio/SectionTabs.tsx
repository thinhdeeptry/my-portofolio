import React from 'react';
import { Code, Award, Layers } from 'lucide-react';

interface SectionTabsProps {
  activeTab: 'projects' | 'certificates' | 'techstack';
  onTabChange: (tab: 'projects' | 'certificates' | 'techstack') => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <button 
        onClick={() => onTabChange('projects')}
        className={`cursor-target flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
          ${activeTab === 'projects' 
            ? 'bg-indigo-950/50 border-indigo-400 text-white' 
            : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-600'
          }`}
      >
        <Code size={20} />
        <span className="font-medium">Projects</span>
      </button>

      {/* <button 
        onClick={() => onTabChange('certificates')}
        className={`cursor-target flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
          ${activeTab === 'certificates' 
            ? 'bg-indigo-950/50 border-indigo-400 text-white' 
            : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-600'
          }`}
      >
        <Award size={20} />
        <span className="font-medium">Certificates</span>
      </button> */}

      <button 
        onClick={() => onTabChange('techstack')}
        className={`cursor-target flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
          ${activeTab === 'techstack' 
            ? 'bg-indigo-950/50 border-indigo-400 text-white' 
            : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-600'
          }`}
      >
        <Layers size={20} />
        <span className="font-medium">Tech Stack</span>
      </button>
    </div>
  );
};

export default SectionTabs;