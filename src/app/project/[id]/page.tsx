'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useProjects } from '@/hooks/useProjects';
import { useTechStack } from '@/hooks/useProjects'; 
import Particles from '@/component/Particles';
import AnimatedContent from '@/component/AnimatedContent';

export default function ProjectDetail() {
  const { id } = useParams();
  const projectId = Array.isArray(id) ? id[0] : id;
  const { projects, isLoading } = useProjects();
  const { techStack } = useTechStack();  // Lấy danh sách tech stack
  const project = projects.find(p => p.id === projectId);
  
  // Tìm thông tin đầy đủ của các technologies từ techStack
  const projectTechnologies = useMemo(() => {
    if (!project?.technologies || !techStack.length) return [];
    
    return project.technologies.map(tech => {
      // Tìm tech trong danh sách techStack
      const techInfo = techStack.find(t => 
        t.name.toLowerCase() === tech.name.toLowerCase() ||
        tech.name.toLowerCase().includes(t.name.toLowerCase()) ||
        t.name.toLowerCase().includes(tech.name.toLowerCase())
      );
      
      return {
        ...tech,
        iconUrl: techInfo?.iconUrl || null,
        color: techInfo?.color || "#666666"
      };
    });
  }, [project, techStack]);
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="relative bg-[#050314] min-h-screen text-white pb-20">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="pointer-events-auto"
        />
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 bg-gradient-to-b from-gray-900/20 to-black">
        {/* Header với nút back */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          reverse={true}
          duration={0.8}
          initialOpacity={0}
          animateOpacity
          threshold={0.1}
        >
          <header className="container mx-auto px-6 py-8">
            <div className="flex items-center gap-4">
              <Link href="/#portfolio" className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors cursor-target">
                <ArrowLeft size={20} />
                <span>Back</span>
              </Link>
              <nav className="text-gray-400 hidden md:flex items-center">
                <span>Projects</span>
                <span className="mx-2">›</span>
                <span className="text-white">{project.title}</span>
              </nav>
            </div>
          </header>
        </AnimatedContent>

        {/* Hero section */}
        <section className="container mx-auto px-6 py-6 md:py-12">
          <AnimatedContent
            distance={50}
            direction="horizontal"
            reverse={true}
            duration={1}
            delay={0.2}
            initialOpacity={0}
            animateOpacity
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400">
              {project.title}
            </h1>
          </AnimatedContent>
          
          <AnimatedContent
            distance={40}
            direction="horizontal"
            reverse={true}
            duration={1}
            delay={0.4}
            initialOpacity={0}
            animateOpacity
          >
            <p className="text-lg text-gray-300 max-w-3xl mb-8">
              {project.description}
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            duration={0.8}
            delay={0.6}
            initialOpacity={0}
            animateOpacity
            scale={0.95}
          >
            <div className="flex flex-wrap gap-4">
              <a 
                href={project.liveUrl} 
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-target"
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </a>
              
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-target"
              >
                <span>View Source</span>
                <Github size={16} />
              </a>
            </div>
          </AnimatedContent>
        </section>

        {/* Screenshot section */}
        <AnimatedContent
          distance={70}
          direction="vertical"
          reverse={false}
          duration={1.2}
          delay={0.4}
          initialOpacity={0}
          animateOpacity
          scale={0.95}
        >
          <section className="container mx-auto px-6 mt-8">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 backdrop-blur-sm bg-gray-900/30 cursor-target">
              <div className="relative aspect-video w-full">
                <Image 
                  src={project.bannerImage || project.imageUrl} 
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>
        </AnimatedContent>

        {/* Project info */}
        <section className="container mx-auto px-6 grid md:grid-cols-2 gap-8 mt-16">
          {/* Technologies column */}
          <AnimatedContent
            distance={50}
            direction="horizontal"
            reverse={true}
            duration={1}
            delay={0.6}
            initialOpacity={0}
            animateOpacity
            startPosition="top 80%"
            endPosition="top 60%"
            toggleActions="play none none none"
          >
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 h-full border border-gray-800/50 cursor-target">
              <h2 className="flex items-center gap-2 text-xl font-bold mb-6">
                <div className="text-blue-400">
                  <code className="bg-blue-900/50 px-2 py-1 rounded">&lt;/&gt;</code>
                </div>
                <span>Technologies Used</span>
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {projectTechnologies.map((tech, idx) => (
                  <AnimatedContent
                    key={idx}
                    distance={20}
                    direction="vertical"
                    reverse={false}
                    duration={0.6}
                    delay={0.2 + idx * 0.05}
                    initialOpacity={0}
                    animateOpacity
                  >
                    <div 
                      className="flex flex-col items-center gap-2 cursor-target bg-gray-800/80 rounded-lg p-3 transition-all hover:scale-105 hover:bg-gray-700/80"
                      style={{ borderLeft: `3px solid ${tech.color}` }}
                    >
                      <div className="relative w-8 h-8">
                        {tech.iconUrl ? (
                          <Image
                            src={tech.iconUrl}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            <code className="text-xs">{tech.name.charAt(0)}</code>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-center font-medium text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </AnimatedContent>

          {/* Features column - giữ nguyên */}
          <AnimatedContent
            distance={50}
            direction="horizontal"
            reverse={false}
            duration={1}
            delay={0.6}
            initialOpacity={0}
            animateOpacity
            startPosition="top 80%"
            endPosition="top 60%"
            toggleActions="play none none none"
          >
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 h-full border border-gray-800/50 cursor-target">
              <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
                <div className="text-amber-400">
                  <span className="bg-amber-900/50 px-2 py-1 rounded">⭐</span>
                </div>
                <span>Key Features</span>
              </h2>
              
              <ul className="space-y-2">
                {project.features?.map((feature, idx) => (
                  <AnimatedContent
                    key={idx}
                    distance={30}
                    direction="horizontal"
                    reverse={false}
                    duration={0.6}
                    delay={0.2 + idx * 0.1}
                    initialOpacity={0}
                    animateOpacity
                  >
                    <li className="flex items-start gap-3 cursor-target">
                      <span className="text-blue-400 mt-1">•</span>
                      <p className="text-gray-300">{feature}</p>
                    </li>
                  </AnimatedContent>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        </section>

        {/* Additional screenshots */}
        {(project.screenshots?.length ?? 0) > 0 && (
          <AnimatedContent
            distance={40}
            direction="vertical"
            reverse={false}
            duration={1}
            delay={0.8}
            initialOpacity={0}
            animateOpacity
            startPosition="top 85%"
            endPosition="top 65%"
            toggleActions="play none none none"
          >
            <section className="container mx-auto px-6 mt-16">
              <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.screenshots?.map((screenshot, idx) => (
                  <AnimatedContent
                    key={idx}
                    distance={40}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    delay={0.4 }
                    initialOpacity={0}
                    animateOpacity
                    scale={0.95}
                  >
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 cursor-target h-full flex flex-col">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                          src={screenshot.url}
                          alt={screenshot.caption || `${project.title} screenshot ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority={idx < 2}
                        />
                      </div>
                      {screenshot.caption && (
                        <div className="p-4 text-gray-300 text-sm flex-grow">
                          {screenshot.caption}
                        </div>
                      )}
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </section>
          </AnimatedContent>
        )}
      </div>
    </div>
  );
}