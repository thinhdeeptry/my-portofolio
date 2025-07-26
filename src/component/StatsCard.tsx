"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Code, Award, Globe } from 'lucide-react';

interface StatsCardProps {
  icon: 'code' | 'award' | 'globe';
  number: number;
  title: string;
  subtitle: string;
  link?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon, 
  number, 
  title, 
  subtitle,
  link
}) => {
  const [count, setCount] = useState(0);
  const countingFinished = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (inView && !countingFinished.current) {
      // Reset counter when coming into view
      setCount(0);
      
      const duration = 2000; // ms
      const interval = 30; // ms
      const steps = duration / interval;
      const increment = number / steps;
      let currentCount = 0;
      
      const counter = setInterval(() => {
        currentCount += increment;
        setCount(Math.min(Math.ceil(currentCount), number));
        
        if (currentCount >= number) {
          clearInterval(counter);
          countingFinished.current = true;
        }
      }, interval);
      
      return () => clearInterval(counter);
    }
    
    // Reset when out of view after a delay
    if (!inView && countingFinished.current) {
      timeout = setTimeout(() => {
        countingFinished.current = false;
      }, 1000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [inView, number]);

  const IconComponent = () => {
    switch (icon) {
      case 'code':
        return <Code size={32} className="text-blue-400" />;
      case 'award':
        return <Award size={32} className="text-purple-400" />;
      case 'globe':
        return <Globe size={32} className="text-cyan-400" />;
      default:
        return <Code size={32} className="text-blue-400" />;
    }
  };

  const Card = () => (
    <div className="bg-gray-900/70 rounded-xl p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="w-14 h-14 rounded-full bg-gray-800/80 flex items-center justify-center">
          <IconComponent />
        </div>
        <div className="text-5xl font-bold text-white tabular-nums">
          {count}
        </div>
      </div>
      <div className="mt-auto">
        <h3 className="text-xl font-semibold text-gray-200 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
      {link && (
        <div className="mt-4 self-end">

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </div>
      )}
    </div>
  );

  return (
    <div ref={ref} className="w-full h-full cursor-target">
      {link ? (
        <a href={link} className="block h-full hover:scale-105 transition-transform duration-300">
          <Card />
        </a>
      ) : (
        <Card />
      )}
    </div>
  );
};

export default StatsCard;