"use client"
import SplitText from "./splitText";

export default function AnimatedHeading() {
    return (
        <div className="text-4xl md:text-5xl lg:text-6xl font-moderniz font-bold leading-tight select-none "
                style={{ color: "#00ffdc", textShadow: `2px 2px 0 #000754, 4px 4px 0 #4079ff, 0 4px 12px #40ffaa, 0 1px 0 #00ffdc` }}>
            <SplitText
                text={`WELCOME TO MY\nPORTFOLIO`}
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
            />
        </div>

    );
}