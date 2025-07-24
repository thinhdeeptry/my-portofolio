import AnimatedHeading from "@/component/AnimatedHeading";
import DarkVeil from "@/component/darkVeil";
import ProfileCardWrapper from "@/component/ProfileCardWrapper";
import TextType from "@/component/textType";
import GradientText from "@/component/GradientText";
import Particles from "@/component/Particles";
import ScrambledText from "@/component/ScrambledText";
import { Facebook, Github, Linkedin } from "lucide-react";
import AnimatedContent from "@/component/AnimatedContent";
import CurvedLoop from "@/component/CurvedLoop";
import TargetCursor from "@/component/TargetCursor";

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
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
        />
      </div>
      <div className="relative z-10 w-full min-h-screen">
        {/* Desktop layout */}
        <div className="hidden md:flex flex-col min-h-screen">
          <div className="flex-grow flex items-center">
            <div className="w-full px-8 lg:px-32">
              <div className="flex flex-row justify-between items-center w-full gap-4 pointer-events-none">
                <div className="self-start pointer-events-auto">
                  <AnimatedHeading />
                  <AnimatedContent
                    distance={150}
                    direction="horizontal"
                    reverse={false}
                    duration={1.2}
                    ease="bounce.out"
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
                    className="text-xl md:text-2xl lg:text-3xl font-medium"
                  />
                  <ScrambledText
                    className=""
                    radius={100}
                    duration={1.2}
                    speed={0.5}>
                    A Full-Stack Software Engineer passionate about building innovative <br />solutions.
                    Experienced with Microservices architecture, NestJS, and Next.js through real-world projects like Welo (real-time chat) <br />and Edu Forge (e-learning platform). My goal is to contribute, learn,
                    and grow in a professional environment to create valuable products.
                  </ScrambledText>

                  
                    {/* skill */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30 text-cyan-300 text-sm font-medium hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 cursor-default">
                        Next.js
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full border border-red-500/30 text-pink-300 text-sm font-medium hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-default">
                        Nest.js
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-sky-500/20 rounded-full border border-cyan-500/30 text-sky-300 text-sm font-medium hover:from-cyan-500/30 hover:to-sky-500/30 transition-all duration-300 cursor-default">
                        Tailwind CSS
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full border border-gray-500/30 text-slate-300 text-sm font-medium hover:from-gray-500/30 hover:to-slate-500/30 transition-all duration-300 cursor-default">
                        Express.js
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full border border-purple-500/30 text-violet-300 text-sm font-medium hover:from-purple-500/30 hover:to-violet-500/30 transition-all duration-300 cursor-default">
                        TypeScript
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-full border border-yellow-500/30 text-amber-300 text-sm font-medium hover:from-yellow-500/30 hover:to-amber-500/30 transition-all duration-300 cursor-default">
                        JavaScript
                      </div>
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full border border-blue-500/30 text-indigo-300 text-sm font-medium hover:from-blue-500/30 hover:to-indigo-500/30 transition-all duration-300 cursor-default">
                        Docker
                      </div>
                    </div>
                    {/* social */}
                    <div className="flex items-center gap-4 mt-8">
                      <a href="https://github.com/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 
                        hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-blue-400 
                        hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110 group">
                        <Github
                          size={24}
                          className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                        />
                      </a>

                      <a href="https://linkedin.com/in/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 
                        hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-cyan-400 
                        hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 group">
                        <Linkedin
                          size={24}
                          className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                        />
                      </a>

                      <a href="https://facebook.com/Thindeeptryy" target="_blank" rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-500/30 
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
                <div className="flex-shrink-0 pointer-events-auto">
                  <ProfileCardWrapper />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <CurvedLoop
              marqueeText="About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦ About Me ✦"
              speed={1}
              curveAmount={200}
              direction="right"
              interactive={true}
              className="text-cyan-300 text-2xl font-medium"
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col min-h-screen py-12">
          <div className="flex-grow flex items-center">
            <div className="w-full px-4">
              <div className="flex flex-col gap-8 items-center justify-center w-full pointer-events-none">
                <div className="w-full text-center pointer-events-auto">
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
                    className="text-xl md:text-2xl font-medium"
                  />

                  <p className="mt-4 text-gray-300 text-sm px-4 ">
                    A Full-Stack Software Engineer passionate about building innovative solutions.
                    Experienced with Microservices architecture, NestJS, and Next.js through real-world projects like Welo (real-time chat) and Edu Forge (e-learning platform). My goal is to contribute, learn,
                    and grow in a professional environment to create valuable products.
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
                    <div className="px-3 py-1 bg-gradient-to-r from-gray-500/20 to-slate-500/20 rounded-full border border-gray-500/30 text-slate-300 text-xs font-medium">
                      Express.js
                    </div>
                  </div>
                </div>

                {/* Social icons cho mobile */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  <a href="https://github.com/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/30 
                    hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-blue-400 
                    hover:shadow-lg hover:shadow-blue-500/20 hover:scale-110 group">
                    <Github
                      size={20}
                      className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                    />
                  </a>

                  <a href="https://linkedin.com/in/thinhdeeptry" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/30 
                    hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-cyan-400 
                    hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-110 group">
                    <Linkedin
                      size={20}
                      className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                    />
                  </a>

                  <a href="https://facebook.com/Thindeeptryy" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-indigo-500/30 
                    hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-indigo-400 
                    hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-110 group">
                    <Facebook
                      size={20}
                      className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300"
                    />
                  </a>
                </div>

                <div className="flex-shrink-0 pointer-events-auto">
                  <ProfileCardWrapper />
                </div>
              </div>
            </div>
          </div>

          {/* CurvedLoop at bottom for mobile */}
          <div className="w-full h-16 overflow-hidden mt-auto">
            <CurvedLoop
              marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
              speed={2}
              curveAmount={150}
              direction="right"
              interactive={true}
              className="text-cyan-300 text-xl font-medium"
            />
          </div>
        </div>
      </div>
    </div >
  );
}
