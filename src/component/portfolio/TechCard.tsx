import React from 'react';
import { TechStack } from '@/types/types';
import Image from 'next/image';

interface TechCardProps {
  tech: TechStack;
}

const TechCard: React.FC<TechCardProps> = ({ tech }) => {
  return (
    <div className="bg-gray-900/70 rounded-xl p-4 flex flex-col items-center cursor-target hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
      <div className="relative w-16 h-16 mb-3">
        <Image
          src={tech.iconUrl}
          alt={tech.name}
          className="w-full h-full object-contain svg-color"
          style={{ 
            filter: tech.color === "#000000" || tech.color === "#FFFFFF" 
              ? undefined 
              : `drop-shadow(0 0 3px ${tech.color})`
          }}
        />
      </div>
      <h3 className="text-center text-gray-300 font-medium">{tech.name}</h3>
    </div>
  );
};

export default TechCard;