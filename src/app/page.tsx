import AnimatedHeading from "@/component/AnimatedHeading";
import ProfileCardWrapper from "@/component/ProfileCardWrapper";
import TextType from "@/component/textType";
import Particles from "@/component/Particles";
import ScrambledText from "@/component/ScrambledText";
import { Facebook, Github, Linkedin, Sparkles } from "lucide-react";
import AnimatedContent from "@/component/AnimatedContent";
import CurvedLoop from "@/component/CurvedLoop";
import GlareHover from "@/component/GlareHover";
import StatsSection from "@/component/StatsSection";
import PortfolioShowcase from "@/component/portfolio/PortfolioShowcase";
import ContactMe from "@/component/ContactMe";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden relative bg-black">
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
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
      <div className="relative z-10 w-full min-h-screen mt-28">
        {/* Desktop layout */}
        <div className="hidden md:flex flex-col min-h-screen">
          <div className="flex-grow flex items-center mb-24">
            <div className="w-full px-8 lg:px-32">
              <div className="flex flex-row justify-between items-center w-full gap-4 pointer-events-none">
                <div className="self-start pointer-events-auto">
                  <AnimatedHeading />
                  <AnimatedContent
                    distance={300}
                    direction="vertical"
                    reverse={false}
                    duration={1.2}
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1.1}
                    threshold={0.2}
                    delay={0.3}
                  >
                    <TextType
                      text={["Front End Developer", "Back End Developer", "FullStack Developer"]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      enableGradient={true}
                      gradientColors={["#40f2ffff", "#4079ff", "#40fffcff", "#4079ff", "#40f9ffff"]}
                      gradientAnimationSpeed={5}
                      className="text-xl md:text-2xl lg:text-3xl font-medium mt-12 mb-12"
                    />
                    <ScrambledText
                      className=""
                      radius={100}
                      duration={1.2}
                      speed={0.5}>
                      Create innovative, usable and user-friendly websites for<br /> digital solutions.
                    </ScrambledText>


                    {/* skill */}
                    <div className="flex flex-wrap gap-3 mt-12">
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 text-cyan-300 text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 cursor-default">
                        Next.js
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-500/30 text-pink-300 text-sm font-medium hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-default">
                        Nest.js
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-500/30 text-sky-300 text-sm font-medium hover:from-cyan-500/30 hover:to-sky-500/30 transition-all duration-300 cursor-default">
                        Tailwind CSS
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full border border-gray-500/30 text-slate-300 text-sm font-medium hover:from-gray-500/30 hover:to-slate-500/30 transition-all duration-300 cursor-default">
                        Express.js
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full border border-purple-500/30 text-violet-300 text-sm font-medium hover:from-purple-500/30 hover:to-violet-500/30 transition-all duration-300 cursor-default">
                        TypeScript
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full border border-yellow-500/30 text-amber-300 text-sm font-medium hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-300 cursor-default">
                        JavaScript
                      </div>
                      <div className="cursor-target px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full border border-blue-500/30 text-indigo-300 text-sm font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300 cursor-default">
                        Docker
                      </div>
                    </div>
                    {/* social */}
                    <div className="flex items-center gap-4 mt-8">
                      <a href="https://github.com/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                        className="cursor-target p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 
                        hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-blue-400 
                        hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110 group">
                        <Github
                          size={24}
                          className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                        />
                      </a>

                      <a href="https://linkedin.com/in/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                        className="cursor-target p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 
                        hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-cyan-400 
                        hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 group">
                        <Linkedin
                          size={24}
                          className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                        />
                      </a>

                      <a href="https://facebook.com/Thindeeptryy" target="_blank" rel="noopener noreferrer"
                        className="cursor-target p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-500/30 
                        hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-indigo-400 
                        hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-110 group">
                        <Facebook
                          size={24}
                          className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                        />
                      </a>
                    </div>
                  </AnimatedContent>
                </div>
                <AnimatedContent
                  distance={300}
                  direction="horizontal"
                  reverse={false}
                  duration={1.2}
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                  delay={0.3}
                >
                  <div className="flex-shrink-0 pointer-events-auto ">
                    <ProfileCardWrapper />
                  </div>
                </AnimatedContent>

              </div>
            </div>
          </div>
          {/* about me */}
          <div id="about" className="w-full overflow-hidden h-auto py-20 bg-gradient-to-b from-gray-900/20 to-black">
            <div className="container mx-auto px-8">
              <div className="flex justify-center flex-col items-center">
                <AnimatedContent
                  distance={100}
                  direction="horizontal"
                  reverse={false}
                  duration={1.5}
                  initialOpacity={0}
                  animateOpacity
                  scale={1.05}
                  startPosition="top 90%" // Khi phần top của element chạm bottom của viewport
                  endPosition="top 15%" // Khi phần top của element đạt % của viewport
                  scrub={false}
                  toggleActions="play none none reverse" // Play khi vào view, reverse khi ra khỏi view
                  repeatAnimation={true} // Cho phép lặp lại animation
                >
                  <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-2">
                    About Me
                  </h1>
                </AnimatedContent>
                <AnimatedContent
                  distance={20}
                  direction="vertical"
                  reverse={true}
                  duration={1}
                  initialOpacity={0}
                  animateOpacity
                  scale={0.95}
                  delay={0.5}
                  startPosition="top 85%"
                  scrub={false}
                  endPosition="top 15%"
                  repeatAnimation={true}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="text-indigo-300" />
                    <p className="text-lg text-gray-300">Transforming ideas into digital experiences</p>
                    <Sparkles className="text-indigo-300" />

                  </div>
                </AnimatedContent>

              </div>
              <div className="flex flex-row lg:flex-row gap-12 items-start justify-between mt-12">
                {/* Content column */}
                <AnimatedContent
                  distance={50}
                  direction="horizontal"
                  reverse={true} // Animation từ trái sang phải
                  duration={1}
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  startPosition="top 80%"
                  endPosition="top 20%"
                  scrub={false} // Damping cao hơn để chuyển động chậm hơn
                  toggleActions="play none none reverse"
                  repeatAnimation={true}
                >
                  <div className="flex-1 w-full self-start">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
                      Hello, I&apos;m
                    </h2>
                    <h1 className="text-6xl font-bold text-white mb-8">
                      Nguyễn Đức Thịnh
                    </h1>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      a soon-to-be graduate Software Engineer from the Industrial University of Ho Chi Minh City,
                      Full-Stack Software Engineer passionate about building innovative <br />solutions.
                      Experienced with Microservices architecture, NestJS, and Next.js through real-world projects like Welo (real-time chat) and Edu Forge (e-learning platform). My goal is to contribute, learn,
                      and grow in a professional environment to create valuable products.

                    </p>

                    <div className="cursor-target bg-gray-900/70 rounded-xl p-6 border border-indigo-500/30 mb-8">
                      <p className="text-indigo-300 italic text-lg">
                        &quot;Leveraging AI as a professional tool, not a replacement.&quot;
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <a href="https://drive.google.com/drive/folders/1lQx3ysSAENamZCxiDGzWraNWke2Axvuk?usp=sharing" target="_blank" rel="noopener noreferrer"
                        className="cursor-target inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-700 hover:to-violet-700 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Download CV
                      </a>

                      <a href="/projects"
                        className="cursor-target inline-flex items-center px-6 py-3 rounded-full bg-transparent border border-violet-500/50 text-violet-300 font-medium hover:bg-violet-950/30 hover:border-violet-500 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                        View Projects
                      </a>
                    </div>
                  </div>
                </AnimatedContent>

                {/* Image column */}
                <AnimatedContent
                  distance={50}
                  direction="horizontal"
                  reverse={false} // Animation từ phải sang trái
                  duration={1}
                  initialOpacity={0}
                  animateOpacity
                  scale={1}
                  startPosition="top 80%"
                  endPosition="top 20%"
                  scrub={false}
                  toggleActions="play none none reverse"
                  repeatAnimation={true}
                >
                  <div className="flex-shrink-0 ml-auto">
                    <GlareHover
                      glareColor="#ffffff"
                      glareOpacity={0.3}
                      glareAngle={-30}
                      glareSize={300}
                      transitionDuration={800}
                      playOnce={false}
                      borderRadius="9999px"
                      className="w-full h-full rounded-full"
                    >
                      <div className="cursor-target rounded-full border-4 border-indigo-500/40 overflow-hidden w-72 h-72 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 p-1">
                        <Image
                          width={30}
                          height={500}
                          src={'/avatar.png'}
                          alt="Profile"
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    </GlareHover>
                  </div>
                </AnimatedContent>
              </div>
            </div>
            <StatsSection />
            <PortfolioShowcase />
            <ContactMe />
          </div>


        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col min-h-screen">
          <div className="flex-grow flex flex-col">
            {/* Hero section mobile */}
            <div className="pt-8 pb-16 px-4">
              <div className="flex flex-col gap-8 items-center w-full">
                <div className="w-full text-center">
                  <AnimatedContent
                    distance={30}
                    direction="vertical"
                    reverse={true}
                    duration={0.8}
                    initialOpacity={0}
                    animateOpacity
                    scale={0.95}
                  >
                    <AnimatedHeading />
                    <TextType
                      text={["Front End Developer", "Back End Developer", "FullStack Developer"]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      enableGradient={true}
                      gradientColors={["#40f2ffff", "#4079ff", "#40fffcff", "#4079ff", "#40f9ffff"]}
                      gradientAnimationSpeed={5}
                      className="text-xl font-medium mt-3 mb-4"
                    />
                  </AnimatedContent>
                </div>

                {/* Profile card for mobile */}
                <AnimatedContent
                  distance={40}
                  direction="vertical"
                  reverse={false}
                  duration={1}
                  initialOpacity={0}
                  animateOpacity
                >
                  <div className="w-[250px] max-w-full mx-auto">
                    <ProfileCardWrapper />
                  </div>

                </AnimatedContent>

                {/* Mobile bio */}
                <AnimatedContent
                  distance={30}
                  direction="vertical"
                  reverse={false}
                  duration={0.8}
                  initialOpacity={0}
                  animateOpacity
                  delay={0.2}
                >
                  <p className="text-gray-300 text-sm leading-relaxed">
                    A Full-Stack Software Engineer passionate about building innovative solutions,
                    experienced with Microservices architecture, NestJS, and Next.js.
                  </p>

                  {/* Badges cho mobile */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 text-cyan-300 text-xs font-medium">
                      Next.js
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-500/30 text-pink-300 text-xs font-medium">
                      Nest.js
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-500/30 text-sky-300 text-xs font-medium">
                      Tailwind
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full border border-purple-500/30 text-violet-300 text-xs font-medium">
                      TypeScript
                    </div>
                  </div>

                  {/* Social icons */}
                  <div className="flex justify-center items-center gap-3 mt-5">
                    <a href="https://github.com/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 
                      hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-blue-400">
                      <Github size={18} className="text-blue-400" />
                    </a>
                    <a href="https://linkedin.com/in/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 
                      hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-cyan-400">
                      <Linkedin size={18} className="text-cyan-400" />
                    </a>
                    <a href="https://facebook.com/Thindeeptryy" target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-500/30 
                      hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-indigo-400">
                      <Facebook size={18} className="text-indigo-400" />
                    </a>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap justify-center gap-3 mt-6">
                    <a href="https://drive.google.com/drive/folders/1lQx3ysSAENamZCxiDGzWraNWke2Axvuk?usp=sharing"
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:from-blue-700 hover:to-violet-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      Download CV
                    </a>
                    <a href="/projects"
                      className="inline-flex items-center px-4 py-2 rounded-full bg-transparent border border-violet-500/50 text-violet-300 text-sm font-medium hover:bg-violet-950/30 hover:border-violet-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                      View Projects
                    </a>
                  </div>
                </AnimatedContent>
              </div>
            </div>

            {/* About section mobile */}
            <div id="about-mobile" className="w-full py-10 bg-gradient-to-b from-gray-900/20 to-black px-4">
              <AnimatedContent
                distance={30}
                direction="vertical"
                reverse={false}
                duration={0.8}
                initialOpacity={0}
                animateOpacity
                startPosition="top 90%"
                endPosition="top 30%"
              >
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
                  About Me
                </h2>

                <div className="flex items-center justify-center gap-1 mb-6">
                  <Sparkles className="text-indigo-300 h-4 w-4" />
                  <p className="text-sm text-gray-300">Transforming ideas into digital experiences</p>
                  <Sparkles className="text-indigo-300 h-4 w-4" />
                </div>

                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800/50 mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
                    Hello, I&apos;m
                  </h3>
                  <h1 className="text-3xl font-bold text-white mb-4">
                    Nguyễn Đức Thịnh
                  </h1>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    a soon-to-be graduate Software Engineer from the Industrial University of Ho Chi Minh City,
                    passionate about building innovative solutions and creating valuable products.
                  </p>

                  <div className="bg-gray-800/50 rounded-lg p-3 border border-indigo-500/20">
                    <p className="text-indigo-300 italic text-sm">
                      &quot;Leveraging AI as a professional tool, not a replacement.&quot;
                    </p>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* Optimized versions of StatsSection */}
            <div className="px-4">
              <StatsSection />
            </div>

            {/* Optimized Portfolio section */}
            <div id="portfolio-mobile">
              <PortfolioShowcase />
            </div>

            {/* Optimized Contact section */}
            <div id="contact-mobile">
              <ContactMe />
            </div>

            {/* CurvedLoop at bottom for mobile */}
            <div className="w-full h-12 overflow-hidden mt-4">
              <CurvedLoop
                marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
                speed={2}
                curveAmount={100}
                direction="right"
                interactive={true}
                className="text-cyan-300 text-base font-medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
