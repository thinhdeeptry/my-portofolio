import AnimatedHeading from "@/component/AnimatedHeading";
import DarkVeil from "@/component/darkVeil";
import ProfileCardWrapper from "@/component/ProfileCardWrapper";
import TextType from "@/component/textType";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden relative bg-black flex flex-col justify-center">
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* Layout desktop - Hiển thị theo chiều ngang */}
      <div className="relative z-10 hidden md:flex flex-row justify-between items-center w-full px-32 gap-4">
        <div className="self-start mt-14">
          <AnimatedHeading />
          <TextType
            text={["Front End Devoloper", "Back End Devoloper", "FullStack Devoloper"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            textColors={["#ffaa40", "#9c40ff", "#ffaa40"]}
          />
        </div>
        <div className="flex-shrink-0">
          <ProfileCardWrapper />
        </div>
      </div>

      {/* Layout mobile - Hiển thị theo chiều dọc */}
      <div className="relative z-10 flex md:hidden flex-col gap-8 items-center justify-center w-full px-4">
        <div className="w-full text-center">

        </div>
        <div className="flex-shrink-0">
          <ProfileCardWrapper />
        </div>
      </div>
    </div>
  );
}
