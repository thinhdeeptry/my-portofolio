"use client"

import React, { useState } from 'react';
import SectionTabs from './SectionTabs';
import ProjectsSection from './ProjectsSection';
import CertificatesSection from './CertificatesSection';
import TechStackSection from './TechStackSection';
import AnimatedContent from '../AnimatedContent';

const PortfolioShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'techstack'>('projects');

  return (
    <div id="Portofolio" className="w-full overflow-hidden py-24 bg-gradient-to-b from-gray-900/20 to-black">
      <div className="container mx-auto px-8 lg:px-32">
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={true}
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          scale={0.98}
          startPosition="top 85%"
          toggleActions="play none none reverse"
          repeatAnimation={true}
          scrub={false}
        >
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4 text-center">
            Portfolio Showcase
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            Explore my journey through projects, certifications, and technical expertise. Each
            section represents a milestone in my continuous learning path.
          </p>
        </AnimatedContent>
        <SectionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <AnimatedContent
          distance={30}
          direction="vertical"
          reverse={true}
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          scale={0.98}
          startPosition="top 85%"
          toggleActions="play none none reverse"
          repeatAnimation={true}
          delay={0.2}
          scrub={false}
        >

          <div className="mt-12">
            {activeTab === 'projects' && <ProjectsSection />}
            {/* {activeTab === 'certificates' && <CertificatesSection />} */}
            {activeTab === 'techstack' && <TechStackSection />}
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default PortfolioShowcase;