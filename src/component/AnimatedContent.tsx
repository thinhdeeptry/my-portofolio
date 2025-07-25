"use client"
import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  startPosition?: string; // Thêm prop mới để điều chỉnh vị trí bắt đầu
  endPosition?: string;   // Thêm prop để điều chỉnh vị trí kết thúc
  scrub?: boolean|number;        // Thêm prop để kích hoạt chế độ scrub
  markers?: boolean;      // Thêm prop để hiển thị markers (hữu ích khi debug)
  repeatAnimation?: boolean; // Điều khiển xem animation có lặp lại khi scroll lên xuống không
  toggleActions?: string;    // Điều khiển hành vi khi scroll
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  startPosition = "top bottom", // Mặc định: khi phần trên của element chạm bottom viewport
  endPosition = "top center",   // Mặc định: khi phần trên của element chạm center viewport
  scrub = false,                // Mặc định: không scrub
  markers = false,              // Mặc định: không hiển thị markers
  toggleActions = "play none none none", // Default value
  repeatAnimation = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
    });

    // Thiết lập ScrollTrigger với toggleActions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: startPosition,
        end: endPosition,
        scrub: scrub,
        markers: false,
        toggleActions: toggleActions, // Sử dụng giá trị được truyền vào
        once: !repeatAnimation, // Chỉ chạy một lần nếu repeatAnimation = false
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
      delay: scrub ? 0 : delay,
      onComplete,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(el);
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
    startPosition,
    endPosition,
    scrub,
    markers,
    toggleActions,
    repeatAnimation,
  ]);

  return <div ref={ref}>{children}</div>;
};

export default AnimatedContent;
