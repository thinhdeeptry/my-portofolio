"use client"
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number
  ) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };
  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch { }
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault(); // Ngăn chặn chuyển hướng mặc định

    const liEl = e.currentTarget;
    if (activeIndex === index) return;

    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current!.removeChild(p));
    }
    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    // Scroll to section after animation
    setTimeout(() => {
      scrollToSection(items[index].href);
    }, 300);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick(
          {
            currentTarget: liEl,
          } as React.MouseEvent<HTMLAnchorElement>,
          index
        );
      }
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      activeIndex
    ] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);
  // hàm scrollToSection
  const scrollToSection = (href: string) => {
    // Nếu là link ngoài thì chuyển hướng
    if (href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }

    // Nếu là link internal
    const targetId = href.replace('/', ''); // Chuyển "/about" thành "about"

    if (!targetId) {
      // Nếu là "/" thì scroll lên đầu
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // Tìm element với id tương ứng
    const element = document.getElementById(targetId);

    if (element) {
      // Cuộn xuống vị trí của element đó
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Thêm hàm handleScroll để cập nhật active state khi scroll
  useEffect(() => {
    // Hàm xác định section hiện tại đang hiển thị trên màn hình
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      // Tạo mảng của các section cần theo dõi
      const sections = items.map(item => {
        const id = item.href.replace('/', '');
        if (!id) return { id: 'home', element: document.body, href: '/' };
        return { id, element: document.getElementById(id), href: item.href };
      }).filter(item => item.element);

      // Tính toán section nào đang hiển thị nhiều nhất trên màn hình
      const viewportHeight = window.innerHeight;
      let maxVisibleSection = { id: 'home', index: 0, visibleHeight: 0 };

      sections.forEach((section, index) => {
        if (!section.element) return;

        const rect = section.element.getBoundingClientRect();

        // Tính toán phần hiển thị trong viewport
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Nếu section này hiển thị nhiều hơn section trước đó
        if (visibleHeight > maxVisibleSection.visibleHeight) {
          maxVisibleSection = {
            id: section.id,
            index,
            visibleHeight
          };
        }

        // Trường hợp đặc biệt - nếu đầu section đã đạt đến đỉnh viewport
        if (rect.top <= 100 && rect.bottom >= viewportHeight / 2) {
          maxVisibleSection = {
            id: section.id,
            index,
            visibleHeight: Infinity  // Ưu tiên cao nhất
          };
        }
      });

      // Nếu section active khác với hiện tại, cập nhật active
      if (maxVisibleSection.index !== activeIndex) {
        setActiveIndex(maxVisibleSection.index);

        // Cập nhật hiệu ứng
        const currentItem = navRef.current?.querySelectorAll('li')[maxVisibleSection.index] as HTMLElement;
        if (currentItem) {
          updateEffectPosition(currentItem);

          // Cập nhật các hiệu ứng khác nếu cần
          if (textRef.current) {
            textRef.current.classList.remove("active");
            void textRef.current.offsetWidth;
            textRef.current.classList.add("active");
          }

          // Không tạo particles khi scroll để tránh quá nhiều hiệu ứng
          // if (filterRef.current) {
          //   makeParticles(filterRef.current);
          // }
        }
      }
    };

    // Thêm event listener
    window.addEventListener('scroll', debounce(handleScroll, 100));

    // Clean up
    return () => {
      window.removeEventListener('scroll', debounce(handleScroll, 100));
    };
  }, [items, activeIndex]); // Chạy lại khi items hoặc activeIndex thay đổi

  // Thêm hàm debounce để tối ưu hiệu suất
  function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <>
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
            --color-1: rgba(139, 92, 246, 0.9);  /* Purple */
            --color-2: rgba(236, 72, 153, 0.9);  /* Pink */
            --color-3: rgba(59, 130, 246, 0.9);  /* Blue */
            --color-4: rgba(249, 115, 22, 0.9);  /* Orange */
            --nav-bg: rgba(9, 0, 20, 0.7);
            --active-text: #111;
            --inactive-text: rgba(255, 255, 255, 0.8);
            --brand-color: #9333EA;
          }
          
          /* Styles cho container và nav */
          .gooey-nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 0.75rem 2rem;
            backdrop-filter: blur(10px);
            background: var(--nav-bg);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            height: 64px;
          }
          
          .brand-logo {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--brand-color);
            text-decoration: none;
            letter-spacing: -0.02em;
            position: relative;
            z-index: 3;
          }
          
          /* Styles cho effect */
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          
          .effect.text {
            color: var(--inactive-text);
            transition: color 0.3s ease;
          }
          
          .effect.text.active {
            color: var(--active-text);
          }
          
          .effect.filter {
            filter: blur(7px) contrast(100) blur(0);
            mix-blend-mode: lighten;
          }
          
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
            // background: black;
          }
          
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          /* Styles cho particles */
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 15px;
            height: 15px;
            border-radius: 9999px;
            transform-origin: center;
          }
          
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 6px);
            left: calc(50% - 6px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          
          .point {
            background: var(--color);
            opacity: 1;
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          
          /* Animations */
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          
          /* Styles cho nav items */
          .nav-list {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 0.95rem;
            position: relative;
            z-index: 3;
            color: var(--inactive-text);
          }
          
          li.active {
            color: var(--active-text);
            text-shadow: none;
          }
          
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          
          .nav-item {
            font-weight: 500;
            letter-spacing: -0.01em;
            padding: 0.4em 0.8em;
            display: inline-block;
          }
        `}
      </style>

      <div className="gooey-nav-container">
        {/* Logo */}
        <Link href="/" className="brand-logo">
          ThinhDeeptry
        </Link>

        {/* Navigation */}
        <div className="relative" ref={containerRef}>
          <nav className="flex relative" style={{ transform: "translate3d(0,0,0.01px)" }}>
            <ul
              ref={navRef}
              className="nav-list"
              style={{
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`rounded-lg relative cursor-pointer transition-all duration-300 hover:text-white ${activeIndex === index ? "active" : ""
                    }`}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="outline-none nav-item"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <span className="effect filter" ref={filterRef} />
          <span className="effect text" ref={textRef} />
        </div>
      </div>
    </>
  );
};

export default GooeyNav;
