"use client"

import React from 'react';
import StatsCard from './StatsCard';
import AnimatedContent from './AnimatedContent';
import { useProjects } from '@/hooks/useProjects';

const StatsSection: React.FC = () => {
  const { projects } = useProjects();
  return (
    <div className="w-full py-16 bg-gray-950/50">
      <div className="container mx-auto px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={true}
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            startPosition="top 85%"
            scrub={false}
            delay={0.1}
            toggleActions="play none none reverse"
            repeatAnimation={true}
          >
            <StatsCard
              icon="code"
              number={projects.length}
              title="TOTAL PROJECTS"
              subtitle="Innovative web solutions crafted"
              link="/projects"
            />
          </AnimatedContent>

          {/* <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={true}
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            startPosition="top 85%"
            scrub={false}
            delay={0.3}
            toggleActions="play none none reverse"
            repeatAnimation={true}
          >
            <StatsCard
              icon="award"
              number={0}
              title="CERTIFICATES"
              subtitle="Professional skills validated"
              link="/certificates"
            />
          </AnimatedContent> */}

          <AnimatedContent
            distance={50}
            direction="vertical"
            reverse={true}
            duration={0.8}
            initialOpacity={0}
            animateOpacity
            scale={0.95}
            startPosition="top 85%"
            scrub={false}
            delay={0.3}
            toggleActions="play none none reverse"
            repeatAnimation={true}
          >
            <StatsCard
              icon="globe"
              number={1}
              title="YEARS OF EXPERIENCE"
              subtitle="Continuous learning journey"
            />
          </AnimatedContent>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;